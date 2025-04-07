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
import { getTcTupeName, monthsInArabic, weeks } from "@crema/hooks/dateHooks";
import { Interview } from "@core/types/models/interview/InterviewTypes";
import dayjs from "dayjs";

type Props = {
  interview: Interview;
};

const Header = ({ interview }: Props) => {

  return (
    <StyledTaskDetailHeader>
      <StyledTaskDetailHeaderInfo>
        <h3 style={{ textAlign: 'center' }}>
          <span> تنفيذ إجراء المقابلات الإرشادية رقم </span>
          <span>{interview.number}</span>
        </h3>
        <StyledTaskDetailHeaderContent>

          <StyledProfileReviewText>
            تاريخ الانشاء :{interview.createdDate}
          </StyledProfileReviewText>

          <StyledProfileReviewText>
            الموسم الدراسي  :{interview.yearTitle}
          </StyledProfileReviewText>
          <span style={{ marginLeft: "20px" }}> </span>

          <span style={{ marginLeft: "20px" }}> </span>

        </StyledTaskDetailHeaderContent>

      </StyledTaskDetailHeaderInfo>

      <StyledTaskDetailSocial>

      </StyledTaskDetailSocial>
    </StyledTaskDetailHeader>
  );
};

export default Header;
