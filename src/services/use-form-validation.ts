import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";


export const useFormValidation = () => {
    const schema = yup.object().shape({
     content: yup.string().required(),
     pencarianProvinsi: yup.string().required(),
     jumlahProvinsi: yup.string().required(),
    })
    
    return useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
        content: "",
        pencarianProvinsi: "",
        jumlahProvinsi: "",
      }
    })
}