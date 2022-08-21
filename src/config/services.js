import { useForm, useWatch, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Cookie from "js-cookie";
import routes from "./routes";
import axios from "./axios";
import { toast } from 'react-toastify';
import moment from 'moment';

 const dateConfig = {
        enableTime: false,
        dateFormat: "Y-m-d",
        altInput: true,
        disableMobile: true,
        altFormat: "F j, Y"
}

export { yup, yupResolver, useWatch, useForm, Swal, Cookie, axios, routes, toast, dateConfig, Controller, moment };