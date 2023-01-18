import { Button, Input, InputRef, Space } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";

type StringFilterProps = FilterDropdownProps & {
  dataIndex: string;
};

export function StringFilter(props: StringFilterProps) {
  const {
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
    dataIndex,
    visible,
  } = props;

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.select();
      }, 200);
    }
  }, [visible]);

  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={inputRef}
        placeholder={`Buscar ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            close();
          }
        }}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => {
            clearFilters?.();
            confirm();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Redefinir
        </Button>
        <Button type="link" size="small" onClick={close}>
          Fechar
        </Button>
      </Space>
    </div>
  );
}
