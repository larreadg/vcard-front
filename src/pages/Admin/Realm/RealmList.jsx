// src/pages/Admin/Realm/RealmList.jsx

import { useState, useEffect, useCallback } from "react"
import { useNavigate  } from 'react-router-dom'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Input, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { Pagination } from "@nextui-org/pagination";
import { jwtDecode } from "jwt-decode"
import { API_URL, ITEMS_PER_PAGE } from "../../../config/constants"
import { EyeIcon } from "../../../icons/EyeIcon";
import { EditIcon } from "../../../icons/EditIcon";
import { SearchIcon } from "../../../icons/SearchIcon";
import axiosInstance from "../../../services/axiosInstance"
import RealmColor from "../../../components/RealmColor";
import CustomBreadcrumbs from "../../../components/CustomBreadcrumbs"
import useAxiosInterceptor from "../../../hooks/useAxiosInterceptor"

const RealmList = () => {

  useAxiosInterceptor(axiosInstance)
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [filter, setFilter] = useState("")
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
  
  useEffect(() => {
    setPage(1)
  }, [filter, itemsPerPage])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      const userId = decoded.id
      const API_URL_REALM = `${API_URL}/usuario-realm/${userId}/realms`
      setIsLoading(true)
      try {
        const response = await axiosInstance.get(`${API_URL_REALM}?page=${page}&itemsPerPage=${itemsPerPage}&filter=${filter}`)
        const { data:apiResult } = response

        setPages(apiResult.data.totalItems ? Math.ceil(apiResult.data.totalItems / itemsPerPage) : 0)
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page, filter, itemsPerPage])


  const goToEdit = useCallback((url) => {
    navigate(url)
  }, [navigate])

  const renderCell = useCallback((item, columnKey) => {
    switch(columnKey){
      case 'accion':
        return (
          <section className="relative flex items-center gap-2">
            <Tooltip content="Detalles">
              <span className="text-lg text-primary cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Editar">
              <span onClick={() => goToEdit(`/admin/dominio/edit/${item.id}`)} className="text-lg text-warning cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </section>
        )
      case 'colorPrimario':
        return (
          <section className="flex items-center gap-2">
            <RealmColor color={item[columnKey]}/>
            <p>{item[columnKey]}</p>
          </section>
        )
      case 'colorSecundario':
        return (
          <section className="flex items-center gap-2">
            <RealmColor color={item[columnKey]}/>
            <p>{item[columnKey]}</p>
          </section>
        )
      default:
        return (<p>{item[columnKey]}</p>)
    }
  }, [goToEdit])

  const breadcrumbs = [
    { label: "Inicio", link: "/admin" },
    { label: "Dominios", link: "/admin/dominio" },
  ]

  return (
    <>
      <section className="grid grid-cols-1">
        <CustomBreadcrumbs items={breadcrumbs} />
      </section>
      <section className="grid grid-cols-1">
        <Input 
          className="mb-4"
          type="text" 
          placeholder="Buscar..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          clearable
          size="sm"
          startContent={
            <SearchIcon className="text-default-400 pointer-events-none flex-shrink-0" />
          }
          isClearable
          onClear={() => setFilter("")}
        />
        <Table
          aria-label="Example table with client async pagination"
          bottomContent={
            pages > 0 ? (
              <section className="flex w-full justify-center gap-4">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  size="sm"
                />
                <Dropdown size="sm">
                  <DropdownTrigger>
                    <Button size="sm">Items por pág. {itemsPerPage}</Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    onAction={(key) => setItemsPerPage(parseInt(key))}
                  >
                    <DropdownItem key="5">5</DropdownItem>
                    <DropdownItem key="10">10</DropdownItem>
                    <DropdownItem key="20">20</DropdownItem>
                    <DropdownItem key="50">50</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </section>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn key="accion">Acciones</TableColumn>
            <TableColumn key="nombre">Nombre</TableColumn>
            <TableColumn key="colorPrimario">Color Primario</TableColumn>
            <TableColumn key="colorSecundario">Color Secundario</TableColumn>
            <TableColumn key="fechaCreacion">Creado el</TableColumn>
          </TableHeader>
          <TableBody
            items={data?.data.realms ?? []}
            loadingContent={<Spinner />}
            loadingState={isLoading ? "loading" : "idle"}
          >
            {(item) => (
              <TableRow key={item?.name}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <section className="flex justify-center my-1">

        </section>
      </section>
    </>
  )
}

export default RealmList
