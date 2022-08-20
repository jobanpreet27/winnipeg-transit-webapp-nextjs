import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import SaveStopIcon from "../components/SaveStopIcon";

export default function Stop(props) {
  const { stop } = props;
  return (
    <Link href={"/stop/" + stop.key}>
      <Card sx={{ marginBottom: 1 }} variant='outlined'>
        <CardActionArea>
          <CardHeader
            title={stop.name}
            subheader={stop.distances.direct}
            action={<SaveStopIcon stop={stop} />}
          />
          <CardContent sx={{ pt: 0, "&:last-child": { pb: 0 } }}>
            {stop.routes.map((route) => (
              <Avatar
                sx={{
                  display: "inline",
                  mr: 1,
                  px: 0.5,
                  color: "#000000",
                  bgcolor: route["badge-style"]["background-color"],
                }}
                variant='square'
                key={route.key}
              >
                {route.key}
              </Avatar>
            ))}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
