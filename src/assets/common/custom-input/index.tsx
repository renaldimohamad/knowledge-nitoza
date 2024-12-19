import {forwardRef} from "react"
import {FormControl, FormControlProps} from "react-bootstrap"

const CustomInput = forwardRef<HTMLInputElement, FormControlProps>(
   ({...rest}, ref) => {
      return (
         <>
            <FormControl {...rest} ref={ref} />
         </>
      )
   }
)

export default CustomInput
