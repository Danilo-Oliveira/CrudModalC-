using System.Data.SqlClient;

namespace CRUD.Models
{
    public class Conexao
    {
        SqlConnection con = new SqlConnection("Data Source=DESKTOP-QPB3I0U;Initial Catalog=CrudModal;Integrated Security=True");
        public Conexao()
        {
            con.ConnectionString = @"Data Source=DESKTOP-QPB3I0U;Initial Catalog=CrudModal;Integrated Security=True";
        }

        public SqlConnection Conectar()
        {
            if (con.State == System.Data.ConnectionState.Closed)
            {
                con.Open();
            }
            return con;
        }

        public void Desconctar()
        {
            if (con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
        }
    }
}
