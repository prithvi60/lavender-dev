import { Card, TextField, Typography } from "@mui/material"
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export const FormStep1 = () => {

    return (
        <section className='w-full flex justify-center items-center flex-1' style={{ height: "60vh" }}>
            <div style={{ width: "40%", padding: "0px 20px" }}>
                <h5 className='text-sm mb-2.5'>Step 1</h5>
                <h4 className="tetx-xl md:text-3xl tracking-wide mb-10">Tell us about your business</h4>
                <p className="text-base mb-2.5">Type your business name</p>
                <TextField id="outlined-basic" size="medium" sx={{ width: "100%", marginTop: "10px" }} label="Salon Name" variant="outlined" />
                <TextField
                    sx={{
                        width: "100%",
                        paddingBottom: "20px",
                        color: "#B3B3B3",
                        marginTop: "20px"
                    }}
                    type="search"
                    size="medium"
                    label="Search for location"
                    variant="outlined"
                    //   value={searchQuery}
                    id="id_2"
                //   onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </section>
    )
}
