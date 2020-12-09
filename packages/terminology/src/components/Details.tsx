import { lime } from '@ant-design/colors';
import { Button, Descriptions, Form, Input, List, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { QueryResult, useMutation, useQuery, useQueryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import { indexConcept, searchConcept } from '../api';

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({ form, visible });

  const onOk = async () => {
    try {
      await form.validateFields();
      onFinish(form.getFieldsValue());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="New Mapping" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item name="system" label="System" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Details = () => {
  const cache = useQueryCache()
  const [visible, setVisible] = useState(false);
  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    let mappings = data.mappings || [];
    mappings = [...mappings, values];
    const updated = { ...data, mappings }
    await mutate(updated);
    hideUserModal();
  };

  let { id } = useParams<{ [key: string]: string }>();
  const { status, data, error, isFetching }: QueryResult<any, any> = useQuery(['concept', { id }], searchConcept, {
    refetchOnWindowFocus: false,
    enabled: id
  });

  const [mutate] = useMutation(indexConcept, {
    onSuccess: (data: any) => {
      cache.setQueryData(['concept', { id: id }], data.data)
    }
  });

  const deleteMapping = async (mapping: any) => {
    const mappings = data.mappings.filter((map: any) => {
      return map.system !== mapping.system && map.code !== mapping.code
    });
    await mutate({ ...data, mappings });
  }

  return (
    <div style={{ padding: 10 }}>
      {status === "loading" ? ("Loading...") : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
          <>
            <Descriptions title="User Info">
              <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
              <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
              <Descriptions.Item label="Short Name">{data.shortName}</Descriptions.Item>
              <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
            </Descriptions>
            <h2>Mappings</h2>
            <List
              header={<div style={{ background: lime[2], display: 'flex', padding: 10, alignItems: 'center' }}><div>Header</div><div style={{ marginLeft: 'auto' }}><Button onClick={() => showUserModal()}>Add</Button></div></div>}
              itemLayout="horizontal"
              dataSource={data.mappings}
              renderItem={(item: any) => (
                <List.Item actions={[<Button key="list-loadmore-edit" onClick={() => deleteMapping(item)}>Delete</Button>]}>
                  <List.Item.Meta
                    title={item.system}
                    description={item.code}
                  />
                </List.Item>
              )}
            />
            <ModalForm visible={visible} onCancel={hideUserModal} onFinish={onFinish} />
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
    </div>
  )
}

export default Details
