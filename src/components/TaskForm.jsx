import React from 'react';
import {Button, Stack, TextField, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {HuePicker} from "react-color";
import Hashtag from "../ui/Hashtag";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Flex from "../ui/Flex";


const initialValues = {
    title: 'the minimum',
    ddl: dayjs().add(20, "minute").format('MM.DD.YYYY HH:mm'),
    desc: "the minimum time for the task is 15 minutes the minimum time for the task is 15 minutes",
    hashtags: [],
    microtasks: [],
    microtask: "",
    newht: {text: "", color: "#00ffff"},
}

const TaskForm = ({handleSubmit, values = initialValues,handleCloseDialog}) => {

    const validationSchema = yup.object().shape({
        title: yup.string().min(3, "Too short!").max(38, "Too long!").required("Required!"),
        desc: yup.string().min(5, "Too short!").max(200, "Too long!").required("Required!"),
        ddl: yup.date().min(dayjs().add(14, "minute").format('MM.DD.YYYY HH:mm'), "The min. time for the task is 15 min!").required("Required!"),
        hashtags: yup.array(),
        microtasks: yup.array(),
        microtask: yup.string().min(3, "Too short!").max(20, "Too long!"),
        newht: yup.object().shape({
            text: yup.string().min(3, "Too short!").max(18, "Too long!"),
            color: yup.string()
        }),
    })


    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const status = values.hasOwnProperty("status") ? values.status : "todo"
            handleSubmit({...values, status: status})
            formik.resetForm()
            if (typeof handleCloseDialog === 'function') {
                handleCloseDialog()
            }
        }


    })

    const addHashtag = () => {
        const newHashtag = formik.values.newht
        const hashtags = formik.values.hashtags
        let empty = !newHashtag.text.length;


        if (!hashtags.includes(newHashtag) && !formik.errors.newht && !empty) {
            const newHashtags = [...hashtags, newHashtag]
            formik.setFieldValue("hashtags", newHashtags)
        }

        formik.setFieldValue("newht", formik.initialValues.newht)
    }
    const deleteHashtag = (hashtag) => {

        const newHashtags = formik.values.hashtags.filter(ht => ht.text !== hashtag.text)
        console.log(hashtag, newHashtags)
        formik.setFieldValue("hashtags", newHashtags)
    }

    const addMicrotask = () => {
        const mt = formik.values.microtask
        const mts = formik.values.microtasks

        if (!mts.includes(mt) && !formik.errors.microtask && !!mt) formik.setFieldValue("microtasks", [...mts, {
            status: false,
            text: mt
        }])
        formik.setFieldValue("microtask", "")
        console.log(mt, formik.values.microtasks, [...mts, mt])
    }

    const handleDeleteMT = (microtask) => {
        const mts = formik.values.microtasks.filter(mt => mt !== microtask)
        formik.setFieldValue("microtasks", mts)
    }

    return (
        <Stack maxWidth={400} as="form" onSubmit={formik.handleSubmit} p={3} sx={{borderRadius: 10}} gap={2}
               bgcolor="#fff">
            <TextField
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        inputFormat='MM.DD.YYYY HH:mm'
                        id="ddl"
                        name="ddl"
                        value={formik.values.ddl}
                        renderInput={(props) => <TextField  {...props}/>}
                        disablePast
                        onChange={(e) => formik.setFieldValue("ddl", dayjs(e).format('MM.DD.YYYY HH:mm'))}
                        label="Deadline"
                    />
                    <Typography ml="12px" fontSize="small"
                                color="red">{formik.touched.ddl && formik.errors.ddl}</Typography>
                </LocalizationProvider>
            </Stack>


            <TextField
                multiline
                id="desc"
                name="desc"
                label="Description"
                minRows="4"
                value={formik.values.desc}
                onChange={formik.handleChange}
                error={formik.touched.desc && Boolean(formik.errors.desc)}
                helperText={formik.touched.desc && formik.errors.desc}
            />

            <Stack gap="8px" direction="row" alignItems="center">
                <TextField
                    fullWidth
                    id="microtask"
                    name="microtask"
                    label="Add microtask"
                    value={formik.values.microtask}
                    onChange={(e) => formik.setFieldValue("microtask", e.target.value)}
                    error={!!formik.errors.microtask}
                    helperText={formik.touched.microtask && formik.errors.microtask}
                />
                <AddBoxIcon fontSize="large" color="primary" cursor="pointer" onClick={addMicrotask}/>

            </Stack>
            <Stack>
                {
                    formik.values?.microtasks?.map((mt) => (
                        <Flex borderRadius={2} alignItems="center" padding="2px 0px" key={mt.text}>
                            <ClearSharpIcon cursor="pointer" onClick={()=>handleDeleteMT(mt)}/>
                            <Typography fontWeight="500">{mt.text}</Typography>
                        </Flex>
                    ))
                }
            </Stack>

            <Stack gap="8px" direction="row" alignItems="center">
                <TextField
                    fullWidth
                    id="newHashtag"
                    name="newHashtag"
                    label="Add Hashtag"
                    value={formik.values.newht.text}
                    onChange={(e) => formik.setFieldValue("newht", {...formik.values.newht, text: e.target.value})}
                    error={!!formik.errors.newht}
                    //helperText={formik.touched.newht && formik.errors.newht.text}
                />
                <AddBoxIcon fontSize="large" color="primary" cursor="pointer" onClick={addHashtag}/>

            </Stack>
            <HuePicker width="100%" color={formik.values.newht.color}

                       onChange={(color) => formik.setFieldValue("newht", {...formik.values.newht, color: color.hex}
                       )}
            />
            <Stack direction="row" gap="8px">
                {
                    formik.values.hashtags?.map(hashtag => (
                        <Hashtag key={hashtag.text}
                                 onClick={() => deleteHashtag(hashtag)}
                                 color={hashtag.color}
                        >

                            {hashtag.text}

                        </Hashtag>


                    ))
                }
            </Stack>


            <Button sx={{maxWidth: "120px", alignSelf: "center", borderRadius: "12px"}} type="submit" size="large"
                    variant="contained">Submit</Button>

        </Stack>
    );
};

export default TaskForm;