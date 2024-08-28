import { useEffect, useRef, useState } from 'react'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

function validateSIN(sin: string): string {
  if (sin.length !== 9 || isNaN(Number(sin))) {
    return 'SIN must be exactly 9 digits.';
  }

  if (!luhnCheck(sin)) {
    return 'Invalid SIN.';
  } else {
    return 'Valid SIN!';
  }
}

function luhnCheck(sin: string): boolean {
  let sum = 0;
  for (let i = 0; i < sin.length; i++) {
    let digit = parseInt(sin[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

function App() {
  const [value, setValue] = useState("")
  const [message, setMessage] = useState("")
  const otpRef = useRef<any>(null)

  console.log(value)

  useEffect(() => {
    if (otpRef && otpRef.current) {
      console.log('hi')
      otpRef.current.focus(); 
    }
  }, []);

  const updateAndValidate = (e: string) => {
    setValue(e)

    const validMessage = validateSIN(e)
    setMessage(validMessage)
  }
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'beige',
    }}>
      <Card style={{
        minWidth: '450px',
      }}>
        <CardHeader>
          <CardTitle>SIN Validator</CardTitle>
          <CardDescription>Please enter your SIN below to see if is valid</CardDescription>
        </CardHeader>
        <CardContent style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '24px 0px',
        }}>
          <InputOTP
            maxLength={9}
            value={value}
            ref={otpRef}
            onChange={updateAndValidate}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
              <InputOTPSlot index={8} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 8
        }}>
          <p>{ message }</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
