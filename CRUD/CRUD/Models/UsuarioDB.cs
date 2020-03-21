using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CRUD.Models
{
    public class UsuarioDB
    {
        //Conexao ao SQL Server
        Conexao conexao = new Conexao();
        SqlCommand com = new SqlCommand();

        //Retorna uma lista de todos os Usuarios
        public List<Usuario> ListAll()
        {
            List<Usuario> lst = new List<Usuario>();
            using (conexao.Conectar())
            {
                com = new SqlCommand("ListarUsuario", conexao.Conectar())
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Usuario
                    {
                        UsuarioID = Convert.ToInt32(rdr["UsuarioID"]),
                        Nome = rdr["Nome"].ToString(),
                        Email = rdr["Email"].ToString(),
                        Senha = rdr["Senha"].ToString(),
                    });
                }
                return lst;
            }
        }

        //Meetodo para Adicionar um Usuario
        public int Add(Usuario emp)
        {
            int i;
            using (conexao.Conectar())
            {
                com = new SqlCommand("InsertUpdateUsuario", conexao.Conectar())
                {
                    CommandType = CommandType.StoredProcedure
                };
                com.Parameters.AddWithValue("@Id", emp.UsuarioID);
                com.Parameters.AddWithValue("@Nome", emp.Nome);
                com.Parameters.AddWithValue("@Email", emp.Email);
                com.Parameters.AddWithValue("@Senha", emp.Senha);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Metodo para Atualizar o Usuario
        public int Update(Usuario emp)
        {
            int i;
            using (conexao.Conectar())
            {
                com = new SqlCommand("InsertUpdateUsuario", conexao.Conectar())
                {
                    CommandType = CommandType.StoredProcedure
                };
                com.Parameters.AddWithValue("@Id", emp.UsuarioID);
                com.Parameters.AddWithValue("@Nome", emp.Nome);
                com.Parameters.AddWithValue("@Email", emp.Email);
                com.Parameters.AddWithValue("@Senha", emp.Senha);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Employee
        public int Delete(int ID)
        {
            int i;
            using (conexao.Conectar())
            {
                com = new SqlCommand("DeleteUsuario", conexao.Conectar())
                {
                    CommandType = CommandType.StoredProcedure
                };
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}