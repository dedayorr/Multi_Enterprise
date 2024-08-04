import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../Context";
import { Modal } from "../Screens/Modal/Modal";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { primaryColor } from "../Screens/cardIssuing/cardIssuing";

function LoginPopUp() {
  const {
    openTranspin,
    setOpenTranspinSuccessful,
    openTranspinSuccessful,
    openResetTranspin,
    open2StepVerification,
    open2StepOTP,
    setOpen2StepOTP,

    setOpenTranspin,
    setOpenResetTranspin,
    setOpen2StepVerification,
  } = useContext(ContextProvider);

  const [countdown, setCountdown] = useState(60);
  const [countdown2, setCountdown2] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [canResend2, setCanResend2] = useState(false);

  const [otp, setOtp] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");

  const [transpinError, setTranspinErrors] = useState("");
  const [verificationPinError, setVerificationPinError] = useState("");
  const [smsOrEmail, setSmsOrEmail] = useState("");

  useEffect(() => {
    if (open2StepOTP === true && smsOrEmail === "sms") {
      let timer;
      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
      } else {
        setCanResend(true);
      }

      return () => clearInterval(timer);
    }
  }, [countdown, open2StepOTP, smsOrEmail]);

  const handleResendOTP = () => {
    // TODO: Implement the OTP resending logic here.
    // For demonstration purposes, we will just reset the countdown to 60 seconds.
    setCountdown(60);
    setCanResend(false);
  };
  const handleResendOTP2 = () => {
    // TODO: Implement the OTP resending logic here.
    // For demonstration purposes, we will just reset the countdown to 60 seconds.
    setCountdown2(60);
    setCanResend2(false);
  };

  function handleTranspin() {
    if (otp === otp2) {
      setOtp("");
      setOtp2("");
      setTranspinErrors("");
      setOpenTranspin(false);
      setOpenTranspinSuccessful(true);
    } else {
      setTranspinErrors("Pin does not match!");
    }
  }
  function handleVerificationOTP() {
    if (otp3 === "123456") {
      setVerificationPinError("");
      setOtp3("");
      setOpen2StepOTP(false);
    } else {
      setVerificationPinError("Incorrect verification code!");
    }
  }

  function twoStepVerificationHandler() {
    setOpen2StepVerification(false);
    setOpen2StepOTP(true);
  }

  return (
    <div>
      {/* FORM OVERLAY AND 2 STEP VERIFICATION */}
      {open2StepVerification === true && (
        <Modal>
          <div className="lg:ml-[38.5%] md:ml-[40%] md:-mt-[20%] lg:-mb-[30%] px-[17.609px] py-[35.536px] bg-white rounded-[10.3px] md:py-[34.96px] md:px-[17.6px] lg:py-[62px] lg:px-[31px]">
            <div className="mb-[25px] lg:mb-[30px]">
              <p className="text-center lg:text-[18px] text-[10.313px] mb-[7] lg:mb-[10px]">
                2-Step Verification!!!
              </p>
              <p className="text-center lg:text-[10px] text-[5.729px]">
                To ensure a safety security of your account, we want to verify
                it’s really you.
              </p>
            </div>
            <div className="flex flex-col items-center">
              {/* VIA SMS STARTS HERE*/}
              <div
                className="flex items-center h-[32px] w-[92px] cursor-pointer rounded-[4.5px] p-1 gap-[5px] lg:w-[161px] lg:h-[60px] lg:rounded-[8px] "
                onClick={() => setSmsOrEmail("sms")}
                style={{
                  borderWidth: 1,
                  borderColor: smsOrEmail === "sms" ? "#d166ff" : "#b3b3b3",
                }}
              >
                <img
                  className="w-[22px] h-[22px] lg:w-[40px] lg:h-[40px]"
                  src="./Images/signupimages/sms.png"
                  alt=""
                />
                <div className="text-[6px] lg:text-[12px]">
                  <div>Via SMS</div>
                  <div>0700&#42;&#42;&#42;&#42;&#42;&#42;</div>
                </div>
              </div>
              {/* VIA SMS ENDS HERE*/}
              {/* VIA Email STARTS HERE*/}
              <div
                className=" flex items-center mt-[17px] h-[32px] w-[92px] cursor-pointer rounded-[4.5px] p-1 gap-[5px] lg:w-[161px] lg:h-[60px] lg:rounded-[8px] "
                onClick={() => setSmsOrEmail("email")}
                style={{
                  borderWidth: 1,
                  borderColor: smsOrEmail === "email" ? "#d166ff" : "#b3b3b3",
                }}
              >
                <img
                  className="w-[22px] h-[22px] lg:w-[40px] lg:h-[40px]"
                  src="./Images/signupimages/email.png"
                  alt=""
                />
                <div className="text-[6px] lg:text-[12px]">
                  <div>Via Email</div>
                  <div>habib@&#42;&#42;&#42;&#42;&#42;&#42;</div>
                </div>
              </div>
              {/* VIA Email ENDS HERE*/}

              <div className="w-full flex justify-center mt-[30px] md:mt-[35px] lg:mt-[50px]">
                <button
                  onClick={twoStepVerificationHandler}
                  type="submit"
                  disabled={smsOrEmail === "" ? true : false}
                  className={` ${
                    smsOrEmail === ""
                      ? " bg-[#b3b3b3] cursor-not-allowed"
                      : "bg-[#04177F] cursor-pointer"
                  } inline-flex justify-center items-center text-[#fff]   text-center   
text-[10px] font-bold leading-[11.31px]  px-[25px] py-[8px] rounded-[3px] lg:rounded-[7px] lg:px-[37px] lg:py-[15px] lg:text-[14px]
`}
                >
                  <p> Signin</p>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* FORM OVERLAY AND 2 STEP VERIFICATION ENDS HERE*/}

      {/* FORM OVERLAY AND TRANSACTION PIN INPUT STARTS HERE */}
      {openTranspin === true && (
        <Modal>
          <div className="lg:ml-[38.5%] md:ml-[40%] md:-mt-[20%] lg:-mb-[30%] px-[17.609px] py-[35.536px] bg-white rounded-[10.3px] md:py-[34.96px] md:px-[17.6px] lg:py-[62px] lg:px-[31px]">
            <p className="lg:text-[16px] text-[9.167px] text-[#000] mb-[30px] text-center">
              Create your transaction pin to continue operations!
            </p>
            <p className="lg:text-[16px] text-[9.167px] text-[#000] my-4 text-center">
              Input pin
            </p>

            {/* TRANSACTION PIN INPUT STARTS HERE */}
            <div className="flex justify-center">
              <OtpInput
                value={otp}
                inputType="tel"
                onChange={setOtp}
                numInputs={4}
                shouldAutoFocus={true}

                inputStyle={{
                  color: "#403f3f",
                  width: 30,
                  height: 30,
                  borderRadius: 3,
                }}
                renderInput={(props) => (
                  <input 
                  
                  {...props} className="inputOTP mx-[3px]" />
                )}
              />
            </div>
            {/* TRANSACTION PIN INPUT ENDS HERE */}

            <p className="lg:text-[16px] text-[9.167px] text-[#000] my-4 text-center">
              Confirm pin
            </p>

            {/* TRANSACTION CONFIRM PIN STARTS HERE */}
            <div className="flex justify-center ">
              <OtpInput
                value={otp2}
                inputType="tel"
                onChange={setOtp2}
                numInputs={4}
                // onFocus={() => handleFocused_otp()}
                // onBlur={() => handleBlur_otp()}
                inputStyle={{
                  color: "#403f3f",
                  width: 30,
                  height: 30,
                  borderRadius: 3,
                }}
                renderInput={(props) => (
                  <input 
                  type="password"
                  {...props} className="inputOTP mx-[3px] " />
                )}
              />
            </div>
            {/* TRANSACTION CONFIRM PIN ENDS HERE */}
            {transpinError.length > 0 ? (
              <p className="text-center text-red-500 lg:text-[16px] text-[9.167px] mt-[3px] mb-[-10px] lg:mb-[-15px] lg:mt-[15px]">
                {transpinError}
              </p>
            ) : (
              ""
            )}
            <div className="w-full flex justify-center mt-[20px] mb-[10px] lg:mb-[10px] lg:mt-[50px]">
              <button
                onClick={handleTranspin}
                type="submit"
                disabled={otp.length !== 4 || otp2.length !== 4 ? true : false}
                className={` ${
                  otp.length !== 4 || otp2.length !== 4
                    ? " bg-[#b3b3b3] cursor-not-allowed"
                    : "bg-[#04177F] cursor-pointer"
                } inline-flex justify-center items-center text-[#fff]   text-center   
text-[10px] font-bold leading-[11.31px]  px-[25px] py-[8px] rounded-[3px] lg:rounded-[7px] lg:px-[37px] lg:py-[15px] lg:text-[14px]
`}
                // style={{
                //   backgroundColor: primaryColor,
                // }}
              >
                <p> Create</p>
              </button>
            </div>

            {/* <div className="w-full flex justify-center mt-[20px] mb-[10px] lg:mb-[10px] lg:mt-[50px]">
              <div
                onClick={() => {
                  setOpenTranspin(false);
                  setOpenTranspinSuccessful(true);
                }}
                className=" inline-flex justify-center items-center text-[#fff]   text-center  cursor-pointer 
                text-[10px] font-bold leading-[11.31px]  px-[25px] py-[8px] rounded-[3px] lg:rounded-[7px] lg:px-[37px] lg:py-[15px] lg:text-[14px]
                "
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                <p> Create</p>
              </div>
            </div> */}
          </div>
        </Modal>
      )}
      {/* FORM OVERLAY AND CHILD TRANSACTION PIN ENDS HERE*/}

      {/* FORM OVERLAY AND 2 STEP OTP VERIFICATION STARTS HERE*/}

      {open2StepOTP === true && smsOrEmail === "sms" && (
        <Modal>
          <div className="lg:ml-[38.5%] md:ml-[40%] md:-mt-[20%] lg:-mb-[30%] px-[17.609px] py-[35.536px] bg-white rounded-[10.3px] md:py-[34.96px] md:px-[17.6px] lg:py-[62px] lg:px-[31px]">
            <div className="mb-[25px] lg:mb-[30px]">
              <p className="  lg:text-[14px] text-[8.02px] ">
                Verification code has been sent to your
              </p>
              <p className=" lg:text-[14px] text-[8.02px] mb-[7] lg:mb-[10px]">
                Phone- 700******0
              </p>
              <p
                className="text-[#737373] lg:text-[10px] text-[5.729px] cursor-pointer"
                onClick={() => {
                  setCountdown2(60);
                  setSmsOrEmail("email");
                }}
              >
                Use email address instead
              </p>
            </div>
            <div>
              <div className="flex justify-center">
                <div className="inline-block ">
                  <OtpInput
                    value={otp3}
                    inputType="tel"
                    onChange={setOtp3}
                    numInputs={6}
                    shouldAutoFocus={true}
                    inputStyle={{
                      color: "#403f3f",
                      width: 30,
                      height: 30,
                      borderRadius: 3,
                    }}
                    renderInput={(props) => (
                      <input
                      type="password"
                      {...props} className="inputOTP mx-[3px]" />
                    )}
                  />
                  {/* Error message starts here */}
                  {verificationPinError.length > 0 ? (
                    <p className="text-center text-red-500 lg:text-[16px] text-[9.167px] mt-[3px] lg:mt-[15px]">
                      {verificationPinError}
                    </p>
                  ) : (
                    ""
                  )}
                  {/* Error message ends here */}
                  {/* Resend OTP starts here */}

                  <div className="w-[100%] flex justify-between">
                    <p className="text-[#04177F] text-[5.729px] lg:text-[10px]">
                      {countdown}
                      <span>sec</span>
                    </p>
                    {canResend ? (
                      <p
                        className="text-[#04177F] text-[5.729px] lg:text-[10px] cursor-pointer"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </p>
                    ) : (
                      <p className="text-gray-400 text-[5.729px] lg:text-[10px] cursor-not-allowed">
                        Resend OTP
                      </p>
                    )}
                  </div>

                  {/* Resend OTP ends here */}
                </div>
              </div>

              <div className="w-full flex justify-center mt-[20px] mb-[10px] lg:mb-[10px] lg:mt-[50px]">
                <button
                  onClick={handleVerificationOTP}
                  type="submit"
                  disabled={otp3.length !== 6 ? true : false}
                  className={` ${
                    otp3.length !== 6
                      ? " bg-[#b3b3b3] cursor-not-allowed"
                      : "bg-[#04177F] cursor-pointer"
                  } inline-flex justify-center items-center text-[#fff]   text-center   
text-[10px] font-bold leading-[11.31px]  px-[25px] py-[8px] rounded-[3px] lg:rounded-[7px] lg:px-[37px] lg:py-[15px] lg:text-[14px]
`}
                  // style={{
                  //   backgroundColor: primaryColor,
                  // }}
                >
                  <p> Continue</p>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {open2StepOTP === true && smsOrEmail === "email" && (
        <Modal>
          <div className="lg:ml-[38.5%] md:ml-[40%] md:-mt-[20%] lg:-mb-[30%] px-[17.609px] py-[35.536px] bg-white rounded-[10.3px] md:py-[34.96px] md:px-[17.6px] lg:py-[62px] lg:px-[31px]">
            <div className="mb-[25px] lg:mb-[30px]">
              <p className="  lg:text-[14px] text-[8.02px] ">
                Verification code has been sent to
              </p>
              <p className=" lg:text-[14px] text-[8.02px] mb-[7] lg:mb-[10px]">
                your email habib****@gmail.com
              </p>
              <p
                className="text-[#737373] lg:text-[10px] text-[5.729px] cursor-pointer"
                onClick={() => {
                  setCountdown(60);
                  setSmsOrEmail("sms");
                }}
              >
                Use phone number instead
              </p>
            </div>
            <div>
              <div className="flex justify-center">
                <div className="inline-block ">
                  <OtpInput
                    value={otp3}
                    inputType="tel"
                    onChange={setOtp3}
                    numInputs={6}
                    shouldAutoFocus={true}
                    inputStyle={{
                      color: "#403f3f",
                      width: 30,
                      height: 30,
                      borderRadius: 3,
                    }}
                    renderInput={(props) => (
                      <input 
                      type="password"
                      {...props} className="inputOTP mx-[3px]" />
                    )}
                  />
                  {/* Error message starts here */}
                  {verificationPinError.length > 0 ? (
                    <p className="text-center text-red-500 lg:text-[16px] text-[9.167px] mt-[3px] lg:mt-[15px]">
                      {verificationPinError}
                    </p>
                  ) : (
                    ""
                  )}
                  {/* Error message ends here */}
                  {/* Resend OTP starts here */}

                  <div className="w-[100%] flex justify-between">
                    <p className="text-[#04177F] text-[5.729px] lg:text-[10px]">
                      {countdown2}
                      <span>sec</span>
                    </p>
                    {canResend2 ? (
                      <p
                        className="text-[#04177F] text-[5.729px] lg:text-[10px] cursor-pointer"
                        onClick={handleResendOTP2}
                      >
                        Resend OTP
                      </p>
                    ) : (
                      <p className="text-gray-400 text-[5.729px] lg:text-[10px] cursor-not-allowed">
                        Resend OTP
                      </p>
                    )}
                  </div>

                  {/* Resend OTP ends here */}
                </div>
              </div>

              <div className="w-full flex justify-center mt-[20px] mb-[10px] lg:mb-[10px] lg:mt-[50px]">
                <button
                  onClick={handleVerificationOTP}
                  type="submit"
                  disabled={otp3.length !== 6 ? true : false}
                  className={` ${
                    otp3.length !== 6
                      ? " bg-[#b3b3b3] cursor-not-allowed"
                      : "bg-[#04177F] cursor-pointer"
                  } inline-flex justify-center items-center text-[#fff]   text-center   
text-[10px] font-bold leading-[11.31px]  px-[25px] py-[8px] rounded-[3px] lg:rounded-[7px] lg:px-[37px] lg:py-[15px] lg:text-[14px]
`}
                  // style={{
                  //   backgroundColor: primaryColor,
                  // }}
                >
                  <p> Continue</p>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* FORM OVERLAY AND 2 STEP OTP VERIFICATION ENDS HERE*/}

      {/* FORM OVERLAY AND TRANSACTION PIN SUCCESSFUL HERE */}
      {openTranspinSuccessful === true && (
        <Modal>
          <div className="lg:ml-[38.5%] md:ml-[40%] md:-mt-[20%] lg:-mb-[30%] px-[17.609px] py-[35.536px] bg-white rounded-[10.3px] md:py-[34.96px] md:px-[17.6px] lg:py-[62px] lg:px-[31px]">
            <div>
              <div className="flex justify-center">
                <div className="flex w-[75%] ">
                  <p className="lg:text-[14px] text-[8.021px]  text-[#000] mb-[30px]">
                    You have successfully created your transaction pin.
                  </p>

                  <img
                    className="lg:w-[50px] lg:h-[50px] w-[32px] h-[32px] "
                    src="./Gif/checkMarkGif.gif"
                    alt="thumbsUpGif"
                  />
                </div>
              </div>
              {/* <Link to="/"> */}
              <div className="w-full flex justify-center mt-[20px]  lg:mt-[50px]">
                <Link to="/dashboard">
                  <div
                    onClick={() => setOpenTranspinSuccessful(false)}
                    className=" inline-flex justify-center items-center text-[#fff]   text-center  cursor-pointer 
      text-[10px] font-bold leading-[11.31px]  px-[25px] py-[8px] rounded-[3px] lg:rounded-[7px] lg:px-[37px] lg:py-[15px] lg:text-[14px]
      "
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    <p> Done</p>
                  </div>
                </Link>
              </div>
              {/* </Link> */}
            </div>
          </div>
        </Modal>
      )}
      {/* FORM OVERLAY AND TRANSACTION PIN SUCCESSFUL ENDS HERE*/}



      {/* FORM OVERLAY AND RESET TRANSACTION PIN  HERE */}
      {openResetTranspin === true && (
<Modal>
          <div className="lg:ml-[38.5%] md:ml-[40%] md:-mt-[20%] lg:-mb-[30%] px-[17.609px] py-[35.536px] bg-white rounded-[10.3px] md:py-[34.96px] md:px-[17.6px] lg:py-[62px] lg:px-[31px]">
            <div>
              <div className="flex justify-center">
                <div className="w-[80%]">
                  <p className="lg:text-[16px] text-[9.167px] text-center  text-[#000] mb-[25px]">
                    We notice you just reset your password.
                  </p>
                  <p className="lg:text-[14px] text-[8.021px]  text-[#747474] text-center">
                    We recommend you to reset your
                  </p>
                  <p className="lg:text-[14px] text-[8.021px]  text-[#747474] mb-[30px] text-center">
                    transaction pin for security purpose.
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-center lg:mt-[50px]">
                <div
                  onClick={() => setOpenResetTranspin(false)}
                  className=" inline-flex justify-center items-center text-[#fff]   text-center  cursor-pointer 
      text-[10px] font-bold leading-[11.31px]  px-[25px] py-[8px] rounded-[3px] lg:rounded-[7px] lg:px-[37px] lg:py-[15px] lg:text-[14px]
      "
                  style={{
                    backgroundColor: primaryColor,
                  }}
                >
                  <p>Reset</p>
                </div>
              </div>
              <p
                onClick={() => setOpenResetTranspin(false)}
                className="text-[#f95252] text-[6.875px] tracking-wider md:text-[12px]  text-center mt-[15px] font-semibold cursor-pointer"
              >
                Cancel
              </p>
            </div>
          </div>
          </Modal>     
      )}
      {/* FORM OVERLAY AND RESET TRANSACTION PIN ENDS HERE*/}



    </div>
  );
}

export default LoginPopUp;
