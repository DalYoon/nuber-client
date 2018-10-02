import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.ul`
  width: 100%;
  margin: 25px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RideInfo = styled.li`
  width: 85%;
  height: 180px;
  margin-top: 25px;
  box-shadow: 3px 3px 13px rgba(0, 0, 0, 0.1), -3px 3px 13px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const InfoHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLetter = styled.span`
  font-size: 13px;
  margin: 0px 10px;
`;

const Content = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
`;

const Price = styled.div`
  width: 35%;
  height: 180px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailBox = styled.div`
  width: 65%;
  font-size: 12px;
  display: flex;
  flex-direction: column;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Category = styled.span`
  font-weight: 700;
  margin-bottom: 3px;
`;

const Desc = styled.span``;

interface IProps {
  rideDatas: any;
}

const RideList: React.SFC<IProps> = ({ rideDatas }) => {
  console.log(rideDatas);

  return (
    <Container>
      {rideDatas.map(rideData => {
        const lastUpdateDate = new Date(rideData.updatedAt);
        const year = lastUpdateDate.getFullYear();
        const month = lastUpdateDate.getMonth();
        const day = lastUpdateDate.getDate();
        const hour = lastUpdateDate.getHours();
        const minute = lastUpdateDate.getMinutes();
        const formattedDate = `${year}/${month}/${day}/${hour}:${minute}`;
        return (
          <RideInfo key={rideData.id}>
            <Link to={`/ride/${rideData.id}`}>
              <InfoHeader>
                <HeaderLetter>{rideData.status}</HeaderLetter>
                <HeaderLetter>{formattedDate}</HeaderLetter>
              </InfoHeader>
              <Content>
                <Price>{rideData.price}$</Price>
                <DetailBox>
                  <Detail>
                    <Category>Departure</Category>
                    <Desc>{rideData.pickUpAddress}</Desc>
                  </Detail>
                  <Detail>
                    <Category>Arrival</Category>
                    <Desc>{rideData.dropOffAddress}</Desc>
                  </Detail>
                  <Detail>
                    <Category>Dispance</Category>
                    <Desc>{rideData.distance}</Desc>
                  </Detail>
                </DetailBox>
              </Content>
            </Link>
          </RideInfo>
        );
      })}
    </Container>
  );
};

export default RideList;
