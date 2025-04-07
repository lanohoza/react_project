import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Rate } from "antd";
import {
  StyledTaskDetailHeader,
  StyledTaskDetailHeaderContent,
  StyledTaskDetailHeaderInfo,
  StyledProfileMbText,
  StyledProfileReviewText,
  StyledTaskDetailSocial,
  StyledStatus,
} from "./index.styled";
import type { ProductDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import { TaskWithActionsDto } from "@core/types/models/task/TaskTypes";
import { getTcTupeName, monthsInArabic, weeks } from "@crema/hooks/dateHooks";

type Props = {
  task: TaskWithActionsDto;
};

const Header = ({ task }: Props) => {

  return (
    <StyledTaskDetailHeader>
      <StyledTaskDetailHeaderInfo>
        <h3>
          <span>تنفيذ الاجراء :</span>
          <span>{task.title}</span>
        </h3>
        <StyledTaskDetailHeaderContent>
          <div>

            <StyledProfileReviewText>
              تاريخ الانشاء :
            </StyledProfileReviewText>
            <span style={{ marginLeft: "20px" }}> {task.createdDate}</span>

            <StyledProfileReviewText>
              التنفيذ  :
            </StyledProfileReviewText>
            <span style={{ marginLeft: "20px" }}>      {getTcTupeName(task.type)}</span>
            {task.runMonth != undefined &&
              <span>            <StyledProfileReviewText>
                الشهر  :
              </StyledProfileReviewText>
                <span style={{ marginLeft: "20px" }}>
                  {monthsInArabic[task.runMonth]}
                </span></span>
            }
            {task.runWeek != undefined &&
              <span>
                <StyledProfileReviewText>
                  الاسبوع  :
                </StyledProfileReviewText>
                <span style={{ marginLeft: "20px" }}>      {weeks[task.runWeek]}</span>
              </span>
            }
          </div>
          <div>
            <StyledProfileReviewText>
              الموسم الدراسي  :
            </StyledProfileReviewText>
            <span> {task.yearTitle}</span>
          </div>
        </StyledTaskDetailHeaderContent>

      </StyledTaskDetailHeaderInfo>

      <StyledTaskDetailSocial>

      </StyledTaskDetailSocial>
    </StyledTaskDetailHeader>
  );
};

export default Header;
