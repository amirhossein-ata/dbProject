import React, { useState } from "react";
import { Row, Col, List, Avatar, Card, message } from "antd";
import {
  add_message_to_ticket,
  selectTicket,
} from "../../../core/actions/ticket";
import AddTicketForm from "./AddTicketForm";

const Ticket = ({ dispatch, ticket, userId }) => {
  const successCallback = () => {
    message.success("پیام با موفقیت ارسال شد.");
  };
  const failureCallback = () => {
    message.error("مشکلی در ارسال پیام به وجود آمد.");
  };
  const onAddMessageToTicket = (response) => {
    dispatch(
      add_message_to_ticket(
        response.file,
        response.text,
        ticket.selectedTicket.id,
        userId,
        ticket.selectedTicket.businessId,
        successCallback,
        failureCallback
      )
    );
  };
  return (
    <Row gutter={24}>
      {ticket.ticketsLoadStatus === "loaded" && (
        <React.Fragment>
          <Col span={12}>
            <h2>لیست تیکت‌ها</h2>
            <List
              style={{ maxHeight: "700px", overflowY: "auto" }}
              itemLayout="horizontal"
              dataSource={ticket.tickets}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    onClick={() => {
                      dispatch(selectTicket(item));
                    }}
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={"نام کاربری"}
                    description={
                      item.messages.length > 0 ? item.messages[0].text : "تیکت"
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            {ticket.selectedTicket ? (
              <React.Fragment>
                <h2>لیست پیام‌های تیکت</h2>
                <List
                  style={{ maxHeight: "338px", overflowY: "auto" }}
                  itemLayout="horizontal"
                  dataSource={ticket.selectedTicket.messages}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={"نام کاربری"}
                        description={item.text}
                      />
                    </List.Item>
                  )}
                />
                <Card title="فرم ثبت پاسخ">
                  <AddTicketForm
                    handleSubmit={onAddMessageToTicket}
                    type="message"
                  />
                </Card>
              </React.Fragment>
            ) : (
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                تیکتی انتخاب نشده‌ است!
              </div>
            )}
          </Col>
        </React.Fragment>
      )}
    </Row>
  );
};

export default Ticket;
