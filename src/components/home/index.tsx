import {Controller} from "react-hook-form"
import {CustomButton} from "../../assets/common/custom-button"
import CustomInput from "../../assets/common/custom-input"
import {useFormValidation} from "../../services/use-form-validation"
import {FormText} from "react-bootstrap"
import {useEffect, useState} from "react"
import {IDataProvinsi} from "../../types/data-provinsi"
import {IDataKabupaten} from "../../types/data-kabupaten"
import {IPost} from "../../types/post"
import "./index.css"

const Index = () => {
   const {
      control,
      handleSubmit,
      reset,
      formState: {errors},
   } = useFormValidation()

   const [posts, setPosts] = useState<IDataProvinsi[]>([])
   const [filteredPosts, setFilteredPosts] = useState<IDataProvinsi[]>([])
   const [provinceLimit, setProvinceLimit] = useState<number | undefined>()
   const [selectedCities, setSelectedCities] = useState<IDataKabupaten[]>([])
   const [searchTerm, setSearchTerm] = useState("")

   useEffect(() => {
      const fetchDataProvinsi = async () => {
         try {
            const res = await fetch(
               "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
            )
            if (!res.ok) throw new Error("Network response was not ok")

            const data = await res.json()
            setPosts(data)
         } catch (error) {
            console.error("Fetch error:", error)
         }
      }

      fetchDataProvinsi()
   }, [])

   const fetchCities = async (provinceId: number) => {
      try {
         const res = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
         )
         if (!res.ok) throw new Error("Network response was not ok")

         const data = await res.json()
         setSelectedCities(data)
      } catch (error) {
         console.error("Fetch error:", error)
      }
   }

   const handleProvinceLimitChange = (
      event: React.ChangeEvent<HTMLElement>
   ) => {
      const target = event.target as HTMLInputElement
      const value = parseInt(target.value, 10)
      if (!isNaN(value) && value > 0) {
         setProvinceLimit(value)
         setFilteredPosts(posts.slice(0, value))
      } else {
         setProvinceLimit(undefined)
         setFilteredPosts([])
      }
   }

   const handleSearchChange = (event: React.ChangeEvent<HTMLElement>) => {
      const target = event.target as HTMLInputElement
      const value = target.value.toLowerCase()
      setSearchTerm(value)

      if (value === "") {
         setFilteredPosts(posts.slice(0, provinceLimit))
      } else {
         const filtered = posts.filter((post) =>
            post.name.toLowerCase().includes(value)
         )
         setFilteredPosts(filtered.slice(0, provinceLimit))
      }
   }

   const handleSubmitForm = (data: IPost) => {
      console.log("Form data:", data)
      reset()
   }

   return (
      <form onSubmit={handleSubmit(handleSubmitForm)}>
         <div className="container">
            <h5 className="text-center">Pencarian Provinsi</h5>
            <div className="d-flex flex-column justify-content-center align-items-center">
               <Controller
                  control={control}
                  name="jumlahProvinsi"
                  render={({field}) => (
                     <>
                        <CustomInput
                           placeholder="Jumlah provinsi"
                           {...field}
                           className="w-50"
                           onChange={(e) => {
                              field.onChange(e)
                              handleProvinceLimitChange(e)
                           }}
                        />
                        {errors.jumlahProvinsi && (
                           <FormText className="text-danger">
                              {errors.jumlahProvinsi.message}
                           </FormText>
                        )}
                     </>
                  )}
               />
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
               <Controller
                  control={control}
                  name="pencarianProvinsi"
                  defaultValue={searchTerm}
                  render={({field}) => (
                     <>
                        <CustomInput
                           placeholder="Cari Provinsi"
                           {...field}
                           value={searchTerm}
                           className="w-50"
                           onChange={(e) => {
                              field.onChange(e)
                              handleSearchChange(e)
                           }}
                        />
                        {errors.pencarianProvinsi && (
                           <FormText className="text-danger">
                              {errors.pencarianProvinsi.message}
                           </FormText>
                        )}
                     </>
                  )}
               />
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
               <CustomButton className="btn btn-primary w-50" text="Submit" />
            </div>

            <div className="d-flex justify-content-center align-items-center">
               <div className="burger-menu">
                  <p className="fw-bold">Daftar Provinsi:</p>
                  {filteredPosts.map((post) => (
                     <CustomButton
                        key={post.id}
                        text={post.name}
                        className="btn btn-primary"
                        onClick={() => fetchCities(post.id)}
                     />
                  ))}
               </div>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3">
               <div className="main-content">
                  <p className="fw-bold">Daftar Kabupaten/Kota:</p>
                  <div className="className">
                     {selectedCities.length > 0 ? (
                        selectedCities.map((city) => (
                           <div className=" border border-drak px-2">
                              <div key={city.id}>
                                 <p>{city.name}</p>
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="fw-bold">
                           Pilih provinsi untuk melihat daftar kabupaten/kota
                        </p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </form>
   )
}

export default Index
