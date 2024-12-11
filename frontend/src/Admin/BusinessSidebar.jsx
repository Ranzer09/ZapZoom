import { Sidebar } from "flowbite-react";
import {
  HiOutlinePlusSm,
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
  HiUserAdd,
} from "react-icons/hi";
import "./styles/businessSidebar.css";
function BusinessSidebar() {
  return (
    <div className="sidebar">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/Api/business" icon={HiChartPie}>
              Business Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="/Api/business/products/add"
              icon={HiOutlinePlusSm}
            >
              Add New Product
            </Sidebar.Item>
            <Sidebar.Item href="/Api/business/products/" icon={HiShoppingBag}>
              Manage Your Products
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
export default BusinessSidebar;
