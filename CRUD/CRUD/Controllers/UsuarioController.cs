using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUD.Controllers
{
    public class UsuarioController : Controller
    {
        readonly UsuarioDB usuario = new UsuarioDB();
        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }

        //Lista
        public JsonResult List()
        {
            return Json(usuario.ListAll(), JsonRequestBehavior.AllowGet);
        }

        //Adicionar
        public JsonResult Add(Usuario emp)
        {
            return Json(usuario.Add(emp), JsonRequestBehavior.AllowGet);
        }

        //Pegando o ID para listar todos os Usuarios
        public JsonResult GetbyID(int ID)
        {
            var usu = usuario.ListAll().Find(x => x.UsuarioID.Equals(ID));
            return Json(usu, JsonRequestBehavior.AllowGet);
        }

        //Atualizar
        public JsonResult Update(Usuario emp)
        {
            return Json(usuario.Update(emp), JsonRequestBehavior.AllowGet);
        }

        //Deletar
        public JsonResult Delete(int ID)
        {
            return Json(usuario.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}