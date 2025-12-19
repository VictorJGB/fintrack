import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
	title?: string;
	description?: string;
	error: string;
	className?: string;
}

export default function ErrorCard({
	error,
	className,
	title,
	description,
}: Props) {
	return (
		<Card className={cn("h-[250px] rounded-2xl bg-destructive/20", className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-destructive font-semibold">{error}</p>
			</CardContent>
		</Card>
	);
}
