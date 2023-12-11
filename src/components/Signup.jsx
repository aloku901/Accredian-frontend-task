import React, { useState } from "react";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Validation from "./SignupValidation";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleShowPassword = () => {
    setValues((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const toggleShowConfirmPassword = () => {
    setValues((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));

    if (values.password !== values.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return;
    }

    if (errors.username === "" && errors.email === "" && errors.password === "") {
      axios
        .post('http://localhost:3000/signup', values)
        .then((res) => {
          navigate('/');
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
          marginTop={5}
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
            Signup
          </Typography>
          <TextField
            margin="normal"
            type="text"
            variant="outlined"
            label="Username"
            name="username"
            onChange={handleInput}
            sx={{ width: "100%" }} 
          />
          <span className="warning">
            {errors.username && <span>{errors.username}</span>}
          </span>
          <TextField
            margin="normal"
            type="email"
            variant="outlined"
            label="Email"
            name="email"
            onChange={handleInput}
            sx={{ width: "100%" }} 
          />
          <span className="warning">
            {errors.email && <span>{errors.email}</span>}
          </span>
          <TextField
            margin="normal"
            type={values.showPassword ? "text" : "password"}
            variant="outlined"
            label="Password"
            name="password"
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}  
          />
          <span className="warning">
            {errors.password && <span>{errors.password}</span>}
          </span>
          <TextField
            margin="normal"
            type={values.showConfirmPassword ? "text" : "password"}
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }} 
          />
          <span className="warning">
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </span>
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="success"
            type="submit"
          >
            Signup
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
