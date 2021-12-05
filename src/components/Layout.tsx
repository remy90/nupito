import { Link, Typography } from "@mui/material";
import Navigator from "./Navigator";
import { StickToEndOfContainer } from "./styledcomponents";

export default function Layout({ children }: any) {
  // debugger;
  return (
    <>
      <Navigator />
      <main>{ children}</main>
      <StickToEndOfContainer>
        <div style={{margin: '0vh 2vh'}} >
          <Typography variant="body2" color="text.secondary" >Created by <Link href="https://github.com/remy90">Shaun</Link></Typography>
        </div>
      </ StickToEndOfContainer>
    </>
  )
}