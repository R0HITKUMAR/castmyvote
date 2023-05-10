import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo/logo.svg";

export default function Sidebar(props) {
  const [active, setActive] = React.useState("/");

  const path = window.location.pathname;
  React.useEffect(() => {
    const s = "/" + path.replace(/^\/([^\/]*).*$/, "$1");
    setActive(s);
  }, [path]);

  const navigate = useNavigate();
  const handleLink = (link) => {
    if (link.sublinks) {
      navigate(link.link);

      setTimeout(() => {
        document.getElementById(link.icon).classList.toggle("open");
      }, 100);
    } else {
      navigate(link.link);
    }
  };

  const Links = [
    { name: "Dashboard", icon: "bx-home-circle", link: "/" },
    { name: "Voters", icon: "bx-user", link: "/voters" },
    { name: "Applications", icon: "bx-user", link: "/applications" },
    { name: "Elections", icon: "bxs-hand-up", link: "/elections" },
    { name: "Query", icon: "bx-question-mark", link: "/query" },
    { name: "Newsletter", icon: "bx-envelope", link: "/newsletter" },
    {
      name: "Actions",
      icon: "bx-cog",
      link: "/actions",
      sublinks: [
        { name: "Add Voter", link: "/voters/newVoter" },
        { name: "Add Election", link: "/elections/addElection" },
      ],
    },
  ];

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link text-center">
          <img src={logo} alt="" height={50} className="app-brand-logo" />
        </a>
        <a
          href="javascript:void(0);"
          onClick={props.hideSidebar}
          className="layout-menu-toggle menu-link text-large d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </a>
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1 mt-1">
        {Links &&
          Links.map((link, index) => {
            return (
              <li
                className={`menu-item ${active === link.link && "active"}`}
                key={index}
                id={link.icon}
              >
                <a
                  href="javascript:void(0);"
                  onClick={() => handleLink(link)}
                  className={`menu-link ${link.sublinks && "menu-toggle"}`}
                >
                  <i className={`menu-icon tf-icons bx ${link.icon}`} />
                  <div>{link.name}</div>
                </a>
                {link.sublinks && (
                  <ul className="menu-sub open">
                    {link.sublinks.map((sublink, index) => {
                      return (
                        <li className="menu-item">
                          <a
                            onClick={() => navigate(sublink.link)}
                            href="javascript:void(0);"
                            className="menu-link"
                          >
                            <div>{sublink.name}</div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        <li className="menu-item">
          <a
            href="javascript:void(0);"
            onClick={() => props.logout()}
            className="menu-link"
          >
            <i className={`menu-icon tf-icons bx bx-exit`} />
            <div>Logout</div>
          </a>
        </li>
      </ul>
    </aside>
  );
}
