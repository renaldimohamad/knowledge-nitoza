import {Button} from "react-bootstrap"

export const CustomButton = ({
   onClick,
   type,
   text,
   className,
}: ICustomButton) => {
   const handleSubmit = () => {
      if (onClick) {
         onClick()
      }
   }
   return (
      <>
         <Button onClick={handleSubmit} type={type} className={className}>
            {" "}
            {text}
         </Button>
      </>
   )
}
