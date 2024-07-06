import React from "react";
import moment, { Moment } from "moment/moment";
import { DatePicker, DateView } from "@mui/x-date-pickers";

type Params = {
  //id: string;
  label: string;
  openTo: "month" | "day" | "year";
  views: DateView[];
  helperText?: string | undefined;
  value: Moment | null;
  onChange: (e: Moment | null) => void;
  error?: boolean | undefined;
};

export const CustomDatePicker = (params: Params) => {
  const error = params.error ?? false;
  return (
    <DatePicker
      label={params.label}
      openTo={params.openTo}
      views={params.views}
      value={moment(params.value)}
      onChange={params.onChange}
      slotProps={{
        textField: {
          helperText: params.helperText,
          error: params.error,
        },
      }}
    />
  );
};
