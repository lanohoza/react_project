'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { message, Modal, Input } from 'antd';

import {
  Student,
  GetStudentDto,
} from '@core/types/models/student/StudentTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { TechnicalCard } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { YearStatus } from '@core/types/enums/YearStatus';
import { deleteTechnicalCard, getTechnicalCardById, useGetAllTechnicalCardsByUser } from '@core/services/TechnicalCardService';
// import { TechnicalCardCategory } from '../../@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes';
import { getAllTechnicalCardCategory } from '@core/services/TechnicalCardCategoryService';
import { User } from '@core/types/models/user/UserTypes';
import { activateUser, getAllUsers } from '@core/services/UserService';

export type UserContextActions = {
  onEdit: (model: User) => void;
  onView: (model: User) => void;
  onDelete: (model: User) => void;
  onActive: (model: User, state: boolean) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onConfirmDeleteModel: () => void;
};
export type UserContextData = {
  userPage: Page<User>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: User;
  openDeleteModel: boolean;
};
const UserContext = createContext<UserContextData>({
  userPage: {} as Page<User>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as User,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const UserActionsContext = createContext<UserContextActions>({
  onEdit: (model: User) => { },
  onView: (model: User) => { },
  onDelete: (model: User) => { },
  onActive: (model: User, state: boolean) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },

});

export const useUserContext = () => useContext(UserContext);

export const useUserActionsContext = () => useContext(UserActionsContext);

type ListMembresContextProviderProps = {
  children: ReactNode;
};

const ListMembresContextProvider: React.FC<ListMembresContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: userPage, loading }, { setQueryParams, fetch }] =
    getAllUsers();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToActivate, setUserToActivate] = useState<User>(undefined);
  const [userNote, setUserNote] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [initialData, setInitialData] = useState<User>(undefined);
  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }

  const reload = () => {
    setInitialData({} as User);
    fetch();
  };
  useEffect(() => {
    reloadData();
  }, [search, page]);

  const reloadData = () => {
    const realPage = page - 1;
    setQueryParams({
      search,
      page: realPage,
    });

  };
  const onChangePage = (page: number) => {
    setPage(page);
  };
  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const onSelectToView = (tc: User) => {
   // ToDo : if needed
  };
  const onSelectToEdit = (tc: User) => {
    // ToDo : if needed
  };

  const activeDesactiveUser = (user: User, checked: boolean) => {
    if (user) {
      setUserToActivate(user);
      setIsChecked(checked);
      setIsModalVisible(true);
    }
  };

  const handleOk = async () => {
    if (userToActivate) {
      const noteToSend = userNote || "";
      console.log(userNote);
      await activateUser(userToActivate, isChecked , noteToSend); 
      reloadData();
      if (isChecked) {
        message.success('تم تفعيل المستخدم بنجاح');
      } else {
        message.success('تم إلغاء تفعيل المستخدم بنجاح');
      }
    }
    setUserNote(''); 
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
    setUserNote('');
  };

  const onSelectToDelete = (user: User) => {
    setOpenDeleteModel(true);
    setIdToDelete(user.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };
  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteTechnicalCard(idToDelete, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        reloadData();
      });
    }

  };
  const onCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  }
  const actions: UserContextActions = {
    onEdit: onSelectToEdit,
    onView: onSelectToView,
    onDelete: onSelectToDelete,
    onActive: activeDesactiveUser,
    onCreate: onSelectCreate,
    onCloseEditViewModel: onCloseEditViewModel,
    reload,
    onSearch: onSearchList,
    onChangePage,
    onConfirmDeleteModel,
    onCloseDeleteModel,
  };

  const contextData: UserContextData = {
    userPage: userPage,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
  };

  return (
    <UserContext.Provider value={contextData}>
      <UserActionsContext.Provider value={actions}>
        {children}

        <Modal
          title="هل أنت متأكد من إجراء هذا التغيير؟"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="نعم"
          cancelText="لا"
        >
          {!isChecked && ( 
            <Input
              placeholder="أدخل ملاحظاتك هنا"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
            />
          )}
        </Modal>
      </UserActionsContext.Provider>
    </UserContext.Provider>
  );
};

export default ListMembresContextProvider;
