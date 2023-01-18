import { ProForm, ProFormProps, ModalForm } from "@ant-design/pro-components";
import { Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { User } from "../models/user";

export interface UserFormScreenRef {
  open: (record?: User) => void;
  close: () => void;
}

export const UserFormScreen = forwardRef<UserFormScreenRef, ProFormProps<User>>(
  (props, ref) => {
    const [form] = Form.useForm<User>();

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: (record?: User) => {
        setOpen(true);

        if (record) {
          form.setFieldsValue(record);
        }
      },
      close: () => setOpen(false),
    }));

    return (
      <ModalForm<User>
        open={open}
        {...props}
        form={form}
        modalProps={{ destroyOnClose: true, onCancel: () => setOpen(false) }}
        trigger={
          <Button type="primary">
            <PlusOutlined />
            Adicionar
          </Button>
        }
      >
        <ProForm.Item name="name" label="Nome">
          <Input />
        </ProForm.Item>
        <ProForm.Item name="email" label="E-mail">
          <Input />
        </ProForm.Item>
      </ModalForm>
    );
  }
);
