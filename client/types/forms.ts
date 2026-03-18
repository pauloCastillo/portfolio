export type FieldProps = {
  labelText: string;
  labelField: string;
  type: string;
  fieldValue: string;
  fieldControlMethod: (
    el: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
};

export type UserContactProps = {
  username: string;
  email: string;
  subject: string;
  message: string;
};
