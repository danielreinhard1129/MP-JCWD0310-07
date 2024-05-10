"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_EVENT_LINKS } from "../../constant";
import { ButtonCircle } from "./ui/button-circle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(NAV_EVENT_LINKS.map((link) => [link.label, false])),
  );
  const [isHoveringSubtitle, setIsHoveringSubtitle] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };
  // Function to handle mouse enter event on a label
  const handleLabelMouseEnter = (label: string) => {
    setSelectedLabel(label);
    setIsHovering((prev: { [key: string]: boolean }) => ({
      ...prev,
      [label]: true,
    }));

    const correspondingLink = NAV_EVENT_LINKS.find(
      (link) => link.label === label,
    );
    if (
      correspondingLink &&
      correspondingLink.tag &&
      correspondingLink.tag.length > 0
    ) {
      setSelectedTitle(correspondingLink.tag[0].title);
    } else {
      setSelectedTitle(null);
    }
  };

  // Function to handle mouse enter event on a title
  const handleMouseEnter = (title: string) => {
    setSelectedTitle(title);
  };

  // Function to handle mouse leave event on the scrollbar titles and subtitles container
  const handleMouseLeave = (label: string) => {
    setIsHovering((prev: { [key: string]: boolean }) => ({
      ...prev,
      [label]: false,
    }));
  };

  return (
    <nav
      className="relative flex items-center justify-between bg-black py-7 text-white"
      style={{ height: "80px" }}
    >
      <div className="ml-4 flex justify-start gap-4 md:ml-10">
        <div className="flex items-center md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonCircle className="bg-white text-black">
                <Menu />
              </ButtonCircle>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="left-0 origin-top-left">
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sports</DropdownMenuItem>
              <DropdownMenuItem>Music</DropdownMenuItem>
              <DropdownMenuItem>Shows</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href="/">
          <Image src="/king-bg.png" alt="logo" width={90} height={70} />
        </Link>

        <div className="ml-4 flex flex-col">
          <ul className="bottom-15 absolute left-36 top-1 hidden items-center gap-4 md:flex">
            {NAV_EVENT_LINKS.map((link) => (
              <li
                key={link.key}
                className="flex flex-col items-center py-6"
                onMouseEnter={() => handleLabelMouseEnter(link.label)}
                onMouseLeave={() => handleMouseLeave(link.label)}
              >
                <div className="ml-2 cursor-pointer">{link.label}</div>

                <div
                  className="ml-96 mt-12 h-80 whitespace-nowrap rounded-md border bg-white text-black"
                  style={{
                    display:
                      isHovering[link.label] ||
                      selectedTitle === link.tag["" as any]?.title
                        ? "flex"
                        : "none",
                    position: "absolute",
                    zIndex: 1000,
                    width: "430px",
                  }}
                  onMouseEnter={() => setIsHoveringSubtitle(true)}
                  onMouseLeave={() => setIsHoveringSubtitle(false)}
                >
                  {/* Title Column */}
                  <div className="h-full w-full overflow-y-scroll font-serif text-stone-500">
                    <div className="text-left">
                      {link.tag && (
                        <div className="px-4 py-4">
                          {/* Render titles directly */}
                          {link.tag.map((tagItem, index) => (
                            <div key={index}>
                              <div
                                className={`p-2 px-2 hover:bg-slate-200 ${
                                  selectedTitle === tagItem.title
                                    ? "bg-slate-200"
                                    : ""
                                }`}
                                onMouseEnter={() =>
                                  handleMouseEnter(tagItem.title)
                                }
                              >
                                {tagItem.title}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* No Sub-items Column - Render only if no sub-items exist */}
                  {link.tag && link.tag.some((tagItem) => tagItem.sub) && (
                    <div className="h-full w-full overflow-y-scroll px-16 font-serif text-stone-500">
                      <div
                        className={`py-4 ${!selectedTitle ? "hidden" : ""}`}
                        style={{ right: "48px", position: "relative" }}
                      >
                        {/* Render sub-items if a title is selected */}
                        {selectedTitle &&
                          link.tag
                            .find((tagItem) => tagItem.title === selectedTitle)
                            ?.sub?.map((subItem: any, subIndex: any) => (
                              <div
                                key={subIndex}
                                className="p-2 px-2 hover:font-bold hover:text-blue-600"
                              >
                                {subItem}
                              </div>
                            ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div></div>
      {Boolean(id) ? (
        <div className="mr-10 hidden flex-row items-center gap-6 md:flex">
          <h1>Support</h1>
          <Button onClick={logout} className="bg-slate-600">
            Logout
          </Button>
        </div>
      ) : (
        <div className="mr-10 hidden flex-row items-center gap-6 md:flex">
          <h1>Support</h1>
          <Button onClick={() => router.push('/login')} className="bg-slate-600">Login</Button>
        </div>
      )}
      <ButtonCircle className="mr-4 flex items-center bg-white text-black md:hidden">
        <User />
      </ButtonCircle>
    </nav>
  );
};
