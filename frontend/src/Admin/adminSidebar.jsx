import { Sidebar } from "flowbite-react";
import { HiOutlinePlusSm, HiChartPie, HiShoppingBag, HiUser, HiViewBoards, HiUserAdd } from "react-icons/hi";
import "./styles/adminSidebar.css"
function AdminSidebar (){
    return(
        <div className="sidebar">
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin" icon={HiChartPie}>
            Admin Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/admin/products/add" icon={HiOutlinePlusSm} >
            New Product
          </Sidebar.Item>
          <Sidebar.Item href="/admin/products/" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="/admin/users/" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="/admin/business/" icon={HiViewBoards}>
            Businesses
          </Sidebar.Item>
          <Sidebar.Item href="/admin/business/register" icon={HiUserAdd}>
            Register Business
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
        </div>
    )
}
 export default AdminSidebar