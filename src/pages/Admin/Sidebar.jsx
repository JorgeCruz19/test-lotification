import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logo48x48.png"

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef(null);
	const sidebar = useRef(null);

	const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (
				!sidebarOpen ||
				sidebar.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	useEffect(() => {
		localStorage.setItem("sidebar-expanded", sidebarExpanded);
		if (sidebarExpanded) {
			document.querySelector("body").classList.add("sidebar-expanded");
		} else {
			document.querySelector("body").classList.remove("sidebar-expanded");
		}
	}, [sidebarExpanded]);

	return (
		<div>
			{/* Sidebar backdrop (mobile only) */}
			<div
				className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				aria-hidden="true"
			></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
					sidebarOpen ? "translate-x-0" : "-translate-x-64"
				}`}
			>
				{/* Sidebar header */}
				<div className="flex justify-between mb-10 pr-3 sm:px-2">
					{/* Close button */}
					<button
						ref={trigger}
						className="lg:hidden text-slate-500 hover:text-slate-400"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						aria-expanded={sidebarOpen}
					>
						<span className="sr-only">Close sidebar</span>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<NavLink end to="/" className="block">
						<img src={Logo} alt="Logo Ecomuni" />					
					</NavLink>
				</div>

				{/* Links */}
				<div className="space-y-8">
					{/* Pages group */}
					<div>
						<ul className="mt-3">
							{/* Dashboard */}
							<li
								className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
									pathname === "dashboard" && "bg-slate-900"
								}`}
							>
								<NavLink
									end
									to="dashboard"
									className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
										pathname === "/admin/dashboard" && "hover:text-slate-200"
									}`}
								>
									<div className="flex items-center">
										<svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
											<path
												className={`fill-current text-slate-400 ${
													pathname === "/admin/dashboard" && "!text-indigo-500"
												}`}
												d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
											/>
											<path
												className={`fill-current text-slate-600 ${
													pathname === "/admin/dashboard" && "text-indigo-600"
												}`}
												d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
											/>
											<path
												className={`fill-current text-slate-400 ${
													pathname === "/admin/dashboard" && "text-indigo-200"
												}`}
												d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
											/>
										</svg>
										<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
											Dashboard
										</span>
									</div>
								</NavLink>
							</li>
							{/* Deparment */}
							<SidebarLinkGroup
								activecondition={pathname.includes("deparment")}
							>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
													pathname.includes("deparment") &&
													"hover:text-slate-200"
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<svg
															className="shrink-0 h-6 w-6"
															viewBox="0 0 24 24"
														>
															<path
																className={`fill-current text-slate-600 ${
																	pathname.includes("deparment") &&
																	"text-indigo-500"
																}`}
																d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
															/>
															<path
																className={`fill-current text-slate-400 ${
																	pathname.includes("deparment") &&
																	"text-indigo-300"
																}`}
																d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
															/>
														</svg>
														<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Deparmentos
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
																open && "transform rotate-180"
															}`}
															viewBox="0 0 12 12"
														>
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="deparment"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Mostrar
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="deparment/create"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Crear
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
							{/* Cities */}
							<SidebarLinkGroup activecondition={pathname.includes("city")}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
													pathname.includes("city") && "hover:text-slate-200"
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<svg
															className="shrink-0 h-6 w-6"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 640 512"
														>
															<path
																className={`fill-current text-slate-600 ${
																	pathname.includes("city") && "text-indigo-500"
																}`}
																d="M480 192H592C618.5 192 640 213.5 640 240V464C640 490.5 618.5 512 592 512H48C21.49 512 0 490.5 0 464V144C0 117.5 21.49 96 48 96H64V24C64 10.75 74.75 0 88 0C101.3 0 112 10.75 112 24V96H176V24C176 10.75 186.7 0 200 0C213.3 0 224 10.75 224 24V96H288V48C288 21.49 309.5 0 336 0H432C458.5 0 480 21.49 480 48V192zM576 368C576 359.2 568.8 352 560 352H528C519.2 352 512 359.2 512 368V400C512 408.8 519.2 416 528 416H560C568.8 416 576 408.8 576 400V368zM240 416C248.8 416 256 408.8 256 400V368C256 359.2 248.8 352 240 352H208C199.2 352 192 359.2 192 368V400C192 408.8 199.2 416 208 416H240zM128 368C128 359.2 120.8 352 112 352H80C71.16 352 64 359.2 64 368V400C64 408.8 71.16 416 80 416H112C120.8 416 128 408.8 128 400V368zM528 256C519.2 256 512 263.2 512 272V304C512 312.8 519.2 320 528 320H560C568.8 320 576 312.8 576 304V272C576 263.2 568.8 256 560 256H528zM256 176C256 167.2 248.8 160 240 160H208C199.2 160 192 167.2 192 176V208C192 216.8 199.2 224 208 224H240C248.8 224 256 216.8 256 208V176zM80 160C71.16 160 64 167.2 64 176V208C64 216.8 71.16 224 80 224H112C120.8 224 128 216.8 128 208V176C128 167.2 120.8 160 112 160H80zM256 272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272zM112 320C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304C64 312.8 71.16 320 80 320H112zM416 272C416 263.2 408.8 256 400 256H368C359.2 256 352 263.2 352 272V304C352 312.8 359.2 320 368 320H400C408.8 320 416 312.8 416 304V272zM368 64C359.2 64 352 71.16 352 80V112C352 120.8 359.2 128 368 128H400C408.8 128 416 120.8 416 112V80C416 71.16 408.8 64 400 64H368zM416 176C416 167.2 408.8 160 400 160H368C359.2 160 352 167.2 352 176V208C352 216.8 359.2 224 368 224H400C408.8 224 416 216.8 416 208V176z"
															/>
														</svg>
														<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Ciudades
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
																open && "transform rotate-180"
															}`}
															viewBox="0 0 12 12"
														>
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="city"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Mostrar
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="city/create"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Crear
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
							{/* Lotifications */}
							<SidebarLinkGroup
								activecondition={pathname.includes("lotification")}
							>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
													pathname.includes("lotification") &&
													"hover:text-slate-200"
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<svg
															className="shrink-0 h-6 w-6"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 122.88 86.42"
														>
															<g>
																<path
																	className={`fill-current text-slate-600 ${
																		pathname.includes("lotification") &&
																		"text-indigo-500"
																	}`}
																	d="M61.04,26.32c-1.38,1.52-3,2.88-4.81,3.98c-0.22,0.16-0.53,0.18-0.77,0.02c-2.67-1.7-4.92-3.75-6.69-5.97 c-2.44-3.06-3.97-6.44-4.49-9.71c-0.54-3.31-0.03-6.49,1.61-9.08c0.65-1.02,1.48-1.95,2.49-2.76C50.71,0.96,53.36-0.02,56,0 c2.54,0.02,5.06,0.97,7.23,2.95c0.76,0.69,1.4,1.49,1.93,2.35c1.77,2.92,2.15,6.64,1.37,10.41C65.77,19.44,63.87,23.22,61.04,26.32 L61.04,26.32L61.04,26.32z M91.73,86.42L74.85,26.11h4.69l27.27,60.31H91.73L91.73,86.42z M55.91,86.42l2.68-54.15l-2.85,1.06 l-2.73-1.06L41.26,86.42H55.91L55.91,86.42z M31.15,86.42l15.84-56.6l-2.09-3.71h-1.57L16.07,86.42H31.15L31.15,86.42z M66.97,86.42L63.53,29.4l2.46-3.29h2.92l12.72,60.31H66.97L66.97,86.42z M0,68.04h16.64L8.3,86.42H0V68.04L0,68.04z M108.52,68.04 h14.36v18.38h-6.06L108.52,68.04L108.52,68.04z M0,26.16h35.2l-5.11,12.22H0V26.16L0,26.16z M90.04,26.16h32.84v12.22H95.13 L90.04,26.16L90.04,26.16z M0,46.96h26.2l-5.67,12.5H0V46.96L0,46.96z M99.01,46.96h23.87v12.5h-18.23L99.01,46.96L99.01,46.96z M55.5,5.88c3.14,0,5.69,2.54,5.69,5.69c0,3.14-2.55,5.68-5.69,5.68c-3.14,0-5.69-2.54-5.69-5.68C49.81,8.43,52.36,5.88,55.5,5.88 L55.5,5.88z"
																/>
															</g>
														</svg>
														<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Lotificaciones
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
																open && "transform rotate-180"
															}`}
															viewBox="0 0 12 12"
														>
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="lotification"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Mostrar
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="lotification/create"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Crear
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
							{/* Blocks */}
							<SidebarLinkGroup activecondition={pathname.includes("block")}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
													pathname.includes("block") && "hover:text-slate-200"
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<svg
															className="shrink-0 h-6 w-6"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 576 512"
														>
															<path
																className={`fill-current text-slate-600 ${
																	pathname.includes("block") &&
																	"text-indigo-500"
																}`}
																d="M172.1 40.16L268.1 3.76C280.9-1.089 295.1-1.089 307.9 3.76L403.9 40.16C425.6 48.41 440 69.25 440 92.52V204.7C441.3 205.1 442.6 205.5 443.9 205.1L539.9 242.4C561.6 250.6 576 271.5 576 294.7V413.9C576 436.1 562.9 456.2 542.5 465.1L446.5 507.3C432.2 513.7 415.8 513.7 401.5 507.3L288 457.5L174.5 507.3C160.2 513.7 143.8 513.7 129.5 507.3L33.46 465.1C13.13 456.2 0 436.1 0 413.9V294.7C0 271.5 14.39 250.6 36.15 242.4L132.1 205.1C133.4 205.5 134.7 205.1 136 204.7V92.52C136 69.25 150.4 48.41 172.1 40.16V40.16zM290.8 48.64C289 47.95 286.1 47.95 285.2 48.64L206.8 78.35L287.1 109.5L369.2 78.35L290.8 48.64zM392 210.6V121L309.6 152.6V241.8L392 210.6zM154.8 250.9C153 250.2 150.1 250.2 149.2 250.9L70.81 280.6L152 311.7L233.2 280.6L154.8 250.9zM173.6 455.3L256 419.1V323.2L173.6 354.8V455.3zM342.8 280.6L424 311.7L505.2 280.6L426.8 250.9C425 250.2 422.1 250.2 421.2 250.9L342.8 280.6zM528 413.9V323.2L445.6 354.8V455.3L523.2 421.2C526.1 419.9 528 417.1 528 413.9V413.9z"
															/>
														</svg>
														<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Bloques
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
																open && "transform rotate-180"
															}`}
															viewBox="0 0 12 12"
														>
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="block"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Mostrar
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="block/create"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Crear
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
							{/* Settings */}
							<SidebarLinkGroup activecondition={pathname.includes("user")}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
													pathname.includes("user") && "hover:text-slate-200"
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<svg
															className="shrink-0 h-6 w-6"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 512 512"
														>
															<path
																className={`fill-current text-slate-600 ${
																	pathname.includes("user") && "text-indigo-500"
																}`}
																d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"
															/>
														</svg>
														<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Configuración
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
																open && "transform rotate-180"
															}`}
															viewBox="0 0 12 12"
														>
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="user/create"
															className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Crear Usuario
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
						</ul>
					</div>
				</div>

				{/* Expand / collapse button */}
				<div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
					<div className="px-3 py-2">
						<button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
							<span className="sr-only">Expand / collapse sidebar</span>
							<svg
								className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
								viewBox="0 0 24 24"
							>
								<path
									className="text-slate-400"
									d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
								/>
								<path className="text-slate-600" d="M3 23H1V1h2z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
