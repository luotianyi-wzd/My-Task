public void login(HttpContext context)  
       {  
           userBLL ub = new userBLL（）；  
           string userName = context.Request["userName"];  
           string userPsw = context.Request["psw"];        
           bool b = ub.Login(userName, userPsw);//封装好的bll层方法，判断用户名密码是否正确  
           if (b == true)  
           {  
               context.Session["Name"] = userName;  
               context.Session["role"] = "user";  
               context.Response.Write("success");  
           }  
           else  
           {  
               context.Response.Write("fail");  
           }  
       }  