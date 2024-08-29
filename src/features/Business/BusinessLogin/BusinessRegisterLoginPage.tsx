import {
  Google,
  Facebook,
  Padding,
  BorderColor,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Grid, Link, Box, IconButton, InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import React, { startTransition, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { useGoogleLogin } from "@react-oauth/google";
import { getRoute } from "../../../utils";
import endpoint from "../../../api/endpoints";
import { useSnackbar } from "../../../components/Snackbar";
import BusinessRegister from "./BusinessRegister";
import GetIcon from "../../../assets/Icon/icon";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import wrappedLayout from "./wrappedLayout";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
  // userType: yup.string().required("UserType is a required field"),
});

function BusinessRegisterLoginPage({ isInLoginModal }) {
  const [renderRegisterModal, setRenderRegisterModal] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [userdetails, setUserDetails] = useState(false);
  const [routeValue, setRouteValue] = useState(getRoute("Login"));
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const hangleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        if (codeResponse && codeResponse.access_token) {
          const response = await endpoint.makeOauthGoogleLogin({
            accessToken: codeResponse.access_token,
          });
          if (response.data.data) {
            await endpoint.setTenantToken(response.data);
            showSnackbar("Login successfully", "success");
            setUserDetails(true);
            setTimeout(() => {
              navigate("/business/dashboard");
            }, 1000);
          } else {
            setTimeout(() => {
              navigate("/business/register");
            }, 1000);
          }
        } else {
          showSnackbar("Error Login via Google", "error");
        }
      } catch (error) {}
    },
    onError: (error) => showSnackbar("Error Login via Google", "error"),
  });

  const mutation = useMutation({
    mutationFn: (payload: any) => {
      return endpoint.getUserLoginToken(payload);
    },
    onSuccess: (response: any) => {
      if (response?.data?.success) {
        showSnackbar("Login successfully", "success");
      } else {
        showSnackbar(response?.data?.data, "error");
      }
    },
    onError: (response: any) => {
      showSnackbar("Something went wrong", "success");
    },
    onSettled: () => {},
  });

  function getUserLoginTokenApi(data) {
    const payLoad = {
      loginId: data?.email,
      password: data?.password,
      userType: "BU",
    };
    mutation.mutate(payLoad);

    // setTimeout(()=>{

    // }, 1000)

    // const loginPayLoad = {
    //     "email": "admin1@lavender.com",
    //     "password": "12345"
    // }
    setUserDetails(true);
  }
  const handleClickContinue = (data) => {
    // console.log("data",data)
    startTransition(() => {
    getUserLoginTokenApi(data);

    navigate("/business/dashboard");

    if (!disableBtn) {
      //dispatch(isNewAccount({ newAccount: true }));
    }
  });
  };

  // function handleButton() {
  //   setRenderRegisterModal(true);
  // }

  function handleRegisterClick() {
    navigate("/business/register");
  }

  function handleForgotPasswordClick() {
    navigate("/business/forgotPassword");
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      {renderRegisterModal ? (
        <BusinessRegister />
      ) : (
        <Grid item spacing={7} sx={{ padding: "" }}>
          <form
            onSubmit={handleSubmit((data: any) => {
              handleClickContinue(data);
              // handleSaveButton(JSON.stringify(data));
            })}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <GetIcon className="cursor-pointer" iconName="LavenderLogo" />
                  <Text
                    className="cursor-pointer flex"
                    variant="h6"
                    sx={{ flexGrow: 1, color: "#1B1464", fontWeight: "700" }}
                    name="Lavender"
                  />
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ padding: "10px" }}>
              <Text
                variant="h4"
                align="center"
                sx={{ color: "#545454" }}
                name="Register or Login"
              />
            </Grid>

            <Grid item xs={12} sx={{ padding: "10px" }}>
              <p style={{ color: "#545454" }}>
                {
                  <Link
                    onClick={() => handleRegisterClick()}
                    className="cursor-pointer tracking-wider text-lg "
                  >
                    Register
                  </Link>
                }
                To Create an account or login to book your next salon experience
                with Lavender.
              </p>
            </Grid>

            <Grid
              item
              xs={12}
              spacing={1}
              className="login-side-buttons"
              sx={{ padding: "10px" }}
            >
              <Button
                sx={{ color: "#4D4D4D" }}
                variant="outlined"
                fullWidth
                disableElevation
                onClick={hangleGoogleLogin}
                startIcon={<Google />}
                className="login"
                name={"Continue with Google"}
              />
              {/* <Button
                variant="outlined"
                sx={{ color: "#4D4D4D" }}
                fullWidth
                disableElevation
                startIcon={<Facebook />}
                className="login"
                name={"Continue with Facebook"}
              /> */}
            </Grid>

            <Grid item xs={12}>
              <Text
                variant="body1"
                sx={{ color: "#545454" }}
                align="center"
                name="-OR-"
              />
            </Grid>

            <Grid item spacing={1} xs={12} sx={{ padding: "10px" }}>
              <TextField
                fullWidth
                label="Email address"
                id="outlined-basic"
                variant="standard"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </Grid>

            <Grid item spacing={1} xs={12} sx={{ padding: "10px" }}>
              <TextField
                sx={{ fontSize: "16px !important" }}
                fullWidth
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ textAlign: "start" }}>
                <Link onClick={() => handleForgotPasswordClick()}>
                  Forgot Password ?
                </Link>
              </Box>
              {errors.password && (
                <p className="text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </Grid>
            {/* <Grid item spacing={1} xs={12} sx={{ padding: "10px" }}>

              <Controller
                name="userType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.userType} fullWidth>
                    <InputLabel>User Type</InputLabel>
                    <Select
                      {...field}
                      label="User Type"
                      error={!!errors.usertype}
                      fullWidth
                      variant="standard"
                    >
                      <MenuItem value="OC">Customer</MenuItem>
                      <MenuItem value="BU">Business</MenuItem>
                    </Select>
                    {errors.userType && <p className='text-red-500 font-medium'>{errors.userType.message}</p>}
                  </FormControl>
                )}
              />
            </Grid> */}
            <Grid item spacing={1} xs={12} sx={{ padding: "10px" }}>
              {/* <TextField
                fullWidth
                label="User Type"
                id="outlined-basic"
                variant="standard"
                disabled
                defaultValue={"BU"}
                // sx={{display: "none"}}
              /> */}
            </Grid>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={styles.btn}
              name={"Continue"}
            ></Button>
          </form>
        </Grid>
      )}
    </>
  );
}
export default wrappedLayout(BusinessRegisterLoginPage);

const styles = {
  btn: {
    width: "100%",
    color: "#FFFFFF",
    backgroundColor: "#825FFF",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "24px",
    padding: "10px 40px 10px 40px",
    borderRadius: "10px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#5A3EBF",
    },
  },
};
