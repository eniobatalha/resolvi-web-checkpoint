// src/lib/menuData.ts

import { GrConfigure } from "react-icons/gr";
import { MdPlayLesson } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa";
import { MdDeveloperMode } from "react-icons/md";
import { PiCheers } from "react-icons/pi";
import { BiSolidTShirt } from "react-icons/bi";
import { IoIosConstruct } from "react-icons/io";
import { MdHealthAndSafety } from "react-icons/md";
import { IoHome } from "react-icons/io5";

export const menuData = [
  {
    category: "Assistência Técnica",
    icon: GrConfigure,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/assistencia-tecnica/1" },
          { name: "Lorem Ipsum 2", link: "/assistencia-tecnica/2" },
        ],
      },
      {
        title: "Subcategoria 2",
        services: [
          { name: "Lorem Ipsum 3", link: "/assistencia-tecnica/3" },
          { name: "Lorem Ipsum 4", link: "/assistencia-tecnica/4" },
        ],
      },
    ],
  },
  {
    category: "Aulas",
    icon: MdPlayLesson,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/aulas/1" },
          { name: "Lorem Ipsum 2", link: "/aulas/2" },
        ],
      },
    ],
  },
  {
    category: "Autos",
    icon: FaCar,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/autos/1" },
          { name: "Lorem Ipsum 2", link: "/autos/2" },
        ],
      },
    ],
  },
  {
    category: "Consultoria",
    icon: FaRegHandshake,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/consultoria/1" },
          { name: "Lorem Ipsum 2", link: "/consultoria/2" },
        ],
      },
    ],
  },
  {
    category: "Design e Tecnologia",
    icon: MdDeveloperMode,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/design-tecnologia/1" },
          { name: "Lorem Ipsum 2", link: "/design-tecnologia/2" },
        ],
      },
    ],
  },
  {
    category: "Eventos",
    icon: PiCheers,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/eventos/1" },
          { name: "Lorem Ipsum 2", link: "/eventos/2" },
        ],
      },
    ],
  },
  {
    category: "Moda e Beleza",
    icon: BiSolidTShirt,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/moda-beleza/1" },
          { name: "Lorem Ipsum 2", link: "/moda-beleza/2" },
        ],
      },
    ],
  },
  {
    category: "Reformas e Reparos",
    icon: IoIosConstruct,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/reformas-reparos/1" },
          { name: "Lorem Ipsum 2", link: "/reformas-reparos/2" },
        ],
      },
    ],
  },
  {
    category: "Saúde",
    icon: MdHealthAndSafety,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/saude/1" },
          { name: "Lorem Ipsum 2", link: "/saude/2" },
        ],
      },
    ],
  },
  {
    category: "Serviços Domésticos",
    icon: IoHome,
    subcategories: [
      {
        title: "Subcategoria 1",
        services: [
          { name: "Lorem Ipsum 1", link: "/servicos-domesticos/1" },
          { name: "Lorem Ipsum 2", link: "/servicos-domesticos/2" },
        ],
      },
    ],
  },
];
