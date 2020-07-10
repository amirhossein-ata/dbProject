import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export default ({ handleSubmit, type }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);

  const validateMessages = {
    required: "این فیلد نباید خالی باشد",
  };

  const normFile = (e) => {
    console.log("Upload event:", e.file);
    setFile(e.file);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onSubmit = () => {
    setFile("");
    setText("");
    handleSubmit({ text, file });
  };
  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      layout="horizontal"
      size={"middle"}
      validateMessages={validateMessages}
      onFinish={onSubmit}
    >
      <Form.Item label="متن تیکت">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
      </Form.Item>
      {type === "message" && (
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              فایل خود را در این اینجا آپلود کنید.
            </p>
          </Upload.Dragger>
        </Form.Item>
      )}
      <Form.Item style={{ marginTop: "1em" }}>
        <Button type="primary" htmlType="submit">
          ثبت تیکت
        </Button>
      </Form.Item>
    </Form>
  );
};
