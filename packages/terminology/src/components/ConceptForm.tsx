import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { lime } from '@ant-design/colors';
import { useMutation } from 'react-query';
import { indexConcept } from '../api';
import { generateUid } from '../utils';

const { Option } = Select
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const ConceptForm = () => {
  const [mutate] = useMutation(indexConcept, {
    onSuccess: () => onReset()
  });

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    await mutate({ ...values, mappings: [] });
  };

  const onReset = () => {
    form.resetFields()
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Form
        {...formItemLayout}
        form={form}
        name="concept-form" onFinish={onFinish}
        style={{ padding: 10, width: '50%', background: lime[2] }}
        initialValues={{ id: generateUid() }}
        size="large"
      >
        <Form.Item name="id" label="ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="shortName" label="Short Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>

        {/* <Form.Item name="valueType" label="Value Type" rules={[{ required: true }]}>
          <Select>
            <Option value="TEXT">TEXT</Option>
            <Option value="NUMBER">NUMBER</Option>
            <Option value="EMAIL">EMAIL</Option>
            <Option value="BOOLEAN">BOOLEAN</Option>
            <Option value="DATE">DATE</Option>
            <Option value="DATETIME">DATETIME</Option>
            <Option value="TIME">TIME</Option>
            <Option value="COORDINATE">COORDINATE</Option>
          </Select>
        </Form.Item> */}
        <Form.Item wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        }}>
          <Space>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="button" onClick={onReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ConceptForm
