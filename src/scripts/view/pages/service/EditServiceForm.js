import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const EditServiceModal = ({
  nameValue = "",
  descriptionValue = "",
  addressValue = "",
  priceValue = "",
  cancellationRangeValue = "",
  open,
  setOpen,
  onSubmit,
}) => {
  const [name, setName] = useState(nameValue);
  const [description, setDescription] = useState(descriptionValue);
  const [address, setAddress] = useState(addressValue);
  const [price, setPrice] = useState(priceValue);
  const [cancellationRange, setCancellationRange] = useState(
    cancellationRangeValue
  );
  const [file, setFile] = useState("");
  const [editType, setEditType] = useState("info");

  const handleChange = (field) => (e) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    } else if (field === "address") {
      setAddress(e.target.value);
    } else if (field === "price") {
      setPrice(e.target.value);
    } else if (field === "cancellationRange") {
      setCancellationRange(e.target.value);
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e.file);
    setFile(e.file);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="فرم ویرایش سرویس"
      visible={open}
      closable={false}
      okText="ویرایش"
      cancelText="انصراف"
      onOk={() => {
        if (editType === "info") {
          onSubmit(
            { name, description, address, price, cancellationRange },
            "info"
          );
        } else if (editType === "upload") {
          onSubmit(file, "upload");
        }
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      {editType === "info" && (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size={"middle"}
        >
          <Form.Item label="نام سرویس">
            <Input
              id="nameInput"
              value={name}
              onChange={handleChange("name")}
            />
          </Form.Item>
          <Form.Item label="توضیحات سرویس">
            <Input.TextArea
              value={description}
              onChange={handleChange("description")}
            />
          </Form.Item>
          <Form.Item label="آدرس">
            <Input value={address} onChange={handleChange("address")} />
          </Form.Item>
          <Form.Item label="قیمت">
            <Input value={price} onChange={handleChange("price")} />
          </Form.Item>
          <Form.Item label="مهلت کنسل کردن">
            <Input
              value={cancellationRange}
              onChange={handleChange("cancellationRange")}
            />
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => setEditType("upload")}>
              آپلود عکس
            </Button>
          </Form.Item>
        </Form>
      )}
      {editType === "upload" && (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size={"middle"}
        >
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
                تصویر خود را در این اینجا آپلود کنید.
              </p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => setEditType("info")}>
              ویرایش اطلاعات
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditServiceModal;
