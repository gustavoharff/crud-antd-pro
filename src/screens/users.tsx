import { Empty, FormInstance, Tag } from "antd";
import { ProTable } from "@ant-design/pro-components";
import axios from "axios";

import { User } from "../models/user";
import { getColumnSearchProps } from "../lib/get-column-search-props";
import { UserFormScreen, UserFormScreenRef } from "./user-form";
import { useRef } from "react";

export function UsersScreen() {
  const modalRef = useRef<UserFormScreenRef>(null);
  const formRef = useRef<FormInstance>();

  return (
    <>
      <UserFormScreen ref={modalRef} formRef={formRef} />

      <ProTable
        size="small"
        rowKey={(user) => user.id}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              modalRef.current?.open(record);
            },
          };
        }}
        pagination={{ defaultPageSize: 10 }}
        request={async (params, sort, filter) => {
          return (
            await axios.get("/api/users", {
              params: {
                ...params,
                filter,
                sort,
              },
            })
          ).data;
        }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Sem dados"
            />
          ),
        }}
        search={{
          resetText: "Redefinir",
          searchText: "Procurar",
          labelWidth: "auto",
        }}
        columns={[
          {
            title: "Código",
            width: 120,
            dataIndex: "id",
          },
          {
            title: "Nome",
            dataIndex: "name",
            ...getColumnSearchProps<User>("name"),
          },
          {
            title: "E-mail",
            dataIndex: "email",
            ...getColumnSearchProps<User>("email"),
          },
          {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: (_, { tags }) => (
              <>
                {tags?.map((tag) => {
                  let color = tag.length > 6 ? "geekblue" : "green";
                  if (tag === "loser") {
                    color = "volcano";
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            ),
          },
          {
            title: "Data do cadastro",
            dataIndex: "createdAt",
            valueType: "date",
          },
          {
            title: "Reputação",
            dataIndex: "reputation",
            valueType: "rate",
          },
        ]}
      />
    </>
  );
}
