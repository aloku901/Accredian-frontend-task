import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./index.css";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickShowPassword = () => {
    setValues((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:3000/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("No Record Found");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin={"auto"}
          marginTop={10}
          padding={3}
          borderRadius={4}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            Login
          </Typography>
          <TextField
            margin="normal"
            type="text"
            variant="outlined"
            label="Email"
            onChange={handleInput}
            name="email"
            sx={{ width: "100%" }}
          />
          <span className="warning">{errors.email && <span>{errors.email}</span>}</span>
          <TextField
            margin="normal"
            type={values.showPassword ? "text" : "password"}
            variant="outlined"
            label="Password"
            onChange={handleInput}
            name="password"
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <span className="warning">{errors.password && <span>{errors.password}</span>}</span>
          <Button sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" color="success" type="submit">
            Login
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Don't have an account? <Link to="/signup">Signup now</Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Login;
