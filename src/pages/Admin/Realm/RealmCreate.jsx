import { Formik } from 'formik'
import { Input, Button } from '@nextui-org/react'
import { API_URL, TOAST_STYLE } from '../../../config/constants'
import CustomBreadcrumbs from "../../../components/CustomBreadcrumbs"
import toast, { Toaster } from 'react-hot-toast'
import RealmColor from '../../../components/RealmColor'
import * as Yup from 'yup'
import axiosInstance from '../../../services/axiosInstance'
import { useRef, useState } from 'react'
import { FileIcon } from '../../../icons/FileIcon'

const RealmCreate = () => {

  const [fileName, setFileName] = useState('Seleccionar')
  const fileInputRef = useRef(null)

  const breadcrumbs = [
    { label: "Inicio", link: "/admin" },
    { label: "Dominios", link: "/admin/dominio" },
    { label: "Crear", link: null },
  ]

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    colorPrimario: Yup.string()
      .matches(/^#[0-9A-F]{6}$/i, 'Debe ser un color hexadecimal válido')
      .required('El color primario es obligatorio'),
    colorSecundario: Yup.string()
      .matches(/^#[0-9A-F]{6}$/i, 'Debe ser un color hexadecimal válido')
      .required('El color secundario es obligatorio'),
    logo: Yup.string().required('El logo es obligatorio'),
  })

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue('logo', reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <section className="grid grid-cols-1">
        <CustomBreadcrumbs items={breadcrumbs} />
      </section>
      <section className="grid grid-col-1">
        <Formik
          initialValues={{ nombre: '', colorPrimario: '', colorSecundario: '', template: 'default', logo: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            axiosInstance.post(`${API_URL}/realm`, { ...values })
              .then(() => {
                toast.success('Dominio creado', { style: TOAST_STYLE })
                setSubmitting(false)
              })
              .catch(() => {
                toast.error('Error al crear dominio', { style: TOAST_STYLE })
                setSubmitting(false)
              })
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">

                <section>
                  <Input
                    label="Nombre del dominio"
                    labelPlacement="outside"
                    type="text"
                    name="nombre"
                    variant="bordered"
                    isInvalid={errors.nombre && touched.nombre}
                    color={errors.nombre && touched.nombre ? "danger" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nombre}
                    errorMessage={errors.nombre && touched.nombre ? errors.nombre : ""}
                    placeholder="Nombre..."
                  />
                </section>
                <section>
                  <Input
                    label="Color primario"
                    labelPlacement="outside"
                    type="text"
                    name="colorPrimario"
                    variant="bordered"
                    isInvalid={errors.colorPrimario && touched.colorPrimario}
                    color={errors.colorPrimario && touched.colorPrimario ? "danger" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.colorPrimario}
                    errorMessage={errors.colorPrimario && touched.colorPrimario ? errors.colorPrimario : ""}
                    placeholder="Color primario..."
                    startContent={
                      <RealmColor color={values.colorPrimario} />
                    }
                  />
                </section>
                <section>
                  <Input
                    label="Color secundario"
                    labelPlacement="outside"
                    type="text"
                    name="colorSecundario"
                    variant="bordered"
                    isInvalid={errors.colorSecundario && touched.colorSecundario}
                    color={errors.colorSecundario && touched.colorSecundario ? "danger" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.colorSecundario}
                    errorMessage={errors.colorSecundario && touched.colorSecundario ? errors.colorSecundario : ""}
                    placeholder="Color secundario..."
                    startContent={
                      <RealmColor color={values.colorSecundario} />
                    }
                  />
                </section>
                <section>
                  <Input
                    onClick={() => fileInputRef.current.click()}
                    label="Logo del dominio"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    isReadOnly
                    value={fileName}
                    startContent={
                      <FileIcon className="text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="logo-upload"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                  {errors.logo && touched.logo && (
                    <div className="text-danger">{errors.logo}</div>
                  )}
                </section>
              </section>
              <section className='flex justify-end'>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  loading={isSubmitting}
                >
                  Crear Dominio
                </Button>
              </section>
            </form>
          )}
        </Formik>
        <Toaster />
      </section>
    </>
  )
}

export default RealmCreate