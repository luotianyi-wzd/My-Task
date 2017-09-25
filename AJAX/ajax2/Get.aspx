protected void Page_Load(object sender,EventArgs e)
{
	Response.Clear();
	string username=Request.QueryString("username");
	string word=Request.QueryString("word");

	Response.Write("姓名："+username+"<br/>密码："+word);

	Response.End();
}