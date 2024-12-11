import { Sidebar } from "flowbite-react";
import {
  HiOutlinePlusSm,
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
  HiUserAdd,
} from "react-icons/hi";
import "./styles/adminSidebar.css";
function AdminSidebar() {
  return (
    <div className="sidebar">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/Api/admin" icon={HiChartPie}>
              Admin Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/Api/admin/products/" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="/Api/admin/users/" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="/Api/admin/business/" icon={HiViewBoards}>
              Businesses
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
export default AdminSidebar;
