import { EmpleadoModel } from "../models/empleado.model.js";

// http://localhost:3000/api/v1/empleados/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {nombre, apellido, cargo, salario, fecha_contratacion, aeropuerto_asignado, email_empleado} = req.body;
    if(!nombre || !apellido || !cargo || !salario || !fecha_contratacion || !aeropuerto_asignado || !email_empleado){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    const empleado = await EmpleadoModel.findOneByEmail(email_empleado);
    if(empleado){
        return res.status(409).json({ok:true, 
                                    message: "El empleado ya existe!"});
    }

    //nueva funcionalidad o faltante
    const newEmpleado = await EmpleadoModel.create({nombre, apellido, cargo, salario, fecha_contratacion, aeropuerto_asignado, email_empleado});

    return res.status(201).json({
        ok: true,
        message: "empleado creado exitosamente" 
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el empleado!"
        });
    }
}

export const EmpleadoController = {
    register
}