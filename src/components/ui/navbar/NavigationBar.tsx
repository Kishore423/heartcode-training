import { ModeToggle } from "@/components/mode-toggle";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { NavigationItem, NavItem } from "@/components/ui/navbar/navigation-item";

const navItems: NavItem[] = [
	{ navigationLink: "/", navigationDescription: "Project Heartcode" },
	{ navigationLink: "/quiz", navigationDescription: "Quiz" },
	{ navigationLink: "/about-me", navigationDescription: "About Me" },
]

export default function NavigationBar() {
	return (
    	<NavigationMenu className="sticky top-0 list-none flex justify-between min-w-full h-[60px] bg-muted px-5">
        	<div className="flex flex-row justify-start gap-4">
            	{navItems.map((navItem, index) => <NavigationItem key={index} navigationLink={navItem.navigationLink} navigationDescription={navItem.navigationDescription} />)}
        	</div>
        	<div className="flex flex-row justify-end">
            	<ModeToggle />
        	</div>
    	</NavigationMenu>
	)
}
