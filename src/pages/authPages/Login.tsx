import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import React, { FormEvent, useState } from "react";
import { Input } from "@mui/icons-material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        id="email-textField"
        label="Email"
        variant="outlined"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: "4%" }}
      />
      <TextField
        id="password-textField"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "8%" }}
      />
      <FormControl
        sx={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          /*startIcon={<Input />}*/ type="submit"
          sx={{ flexGrow: "1", maxWidth: "45%" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          // startIcon={<Input />}
          type="submit"
          sx={{ flexGrow: "1", maxWidth: "45%" }}
        >
          Register
        </Button>
      </FormControl>
    </Box>
  );
};
