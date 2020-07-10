import React, { useState } from "react";
import { Modal, Form, Input, Rate } from "antd";

const AddCommentModal = ({ open, setOpen, onSubmit }) => {
  const [text, setText] = useState("");
  const [point, setPoint] = useState(0);

  return (
    <Modal
      title="فرم ثبت نظر"
      visible={open}
      closable={false}
      okText="ثبت‌"
      cancelText="انصراف"
      onOk={() => {
        onSubmit(text, point);
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        size={"middle"}
      >
        <Form.Item label="امتیاز">
          <Rate onChange={(e) => setPoint(e)} value={point} />
        </Form.Item>

        <Form.Item label="متن نظر">
          <Input.TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCommentModal;
