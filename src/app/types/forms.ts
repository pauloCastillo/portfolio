import { ChangeEvent } from "react";

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

