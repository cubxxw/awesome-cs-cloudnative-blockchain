import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.MouseEvent;
import java.util.*;

class A 
{
	int m,n;
	
	public A(int a,int b)
	{
		m=a;
		n=b;
		
	}
}
class Robot extends Thread
{
	int m=1,n=1;
	Vector v=new Vector();
	int [][]map;
	public void setmap(int [][] mm)
	{	
		map=mm;
		
	} 
	
	public boolean way(int i,int j)
	{
		//递归的方法,产生一条路径,保存到v中
		if(map[23][23]==2)//什莫时候map[23][23]会等于2
			return true;
	
		else
		{
			if(map[i][j]==0)
			{
				map[i][j]=2;
				A x=new A(i,j);
				v.add(x);
				if(way(i,j-1))
				return true;
			
				else if (way(i,j+1))
				return true;
				else if (way(i-1,j))
				return true;
				else if (way(i+1,j))
				return true;
				//=========
				else if(way(i-1,j-1))
				return true;
				else if(way(i+1,j-1))
				return true;
				else if(way(i-1,j+1))
				return true;				
				else if(way(i+1,j+1))
				return true;
				//=========
				else 
				{
					map[i][j]=3;
					A y=new A(i,j);
					v.add(y);
					return false;
				}
			}
			else
			{
				return false;
			}
		}
		
		
	}
	public void run()
	{
		try{	
				System.out.println(v.size());
				for (int i = 0; i<v.size(); i++)
				{
					//改变当前对象的m,n
					this.m = ((A)v.get(i)).m;
					this.n = ((A)v.get(i)).n;
					
					Thread.sleep(10);
				}
			}catch(Exception e){}
	}
}
class mypanel extends JPanel implements Runnable , ActionListener, MouseListener
{
	int [][]map = new int [25][25];
	int m1,m2,n1,n2;
	int i1,i2,j1,j2;
	Robot robot;
	public mypanel()
	{
		for (int i=0;i<25;i++)
		{
			map[i][0]=1;
			map[0][i]=1;
			map[i][24]=1;
			map[24][i]=1;
			
		}
		this.addMouseListener(this);
	}
	public void paint(Graphics g)
	{
		super.paint(g);
		g.setColor(Color.red);
		for(int i=0; i<26;i++)
		{
			g.drawLine(0,i*20,500,i*20);
		}
		for (int i=0 ; i<26 ; i++)
		{
			g.drawLine(i*20,0,i*20,500);
		}
		g.setColor(Color.green);
		for (int i=0;i<25;i++)
			for(int j=0;j<25;j++)
			{
				if (map[i][j]==1)
				{
					g.fill3DRect(i*20,j*20,20,20,true);
				}
			}
		if(robot!=null)
		{
			g.setColor(Color.blue);
			g.fillOval(robot.m*20,robot.n*20,20,20);
		}
		
	}
	public void run()
	{
		try{
			while(true)
			{	
				this.repaint();
				Thread.sleep(5);
			}
			}catch(Exception e){}
	}

	public void actionPerformed(ActionEvent e) {
		if(e.getActionCommand().equals("qing"))
		{
			for(int i=1;i<24;i++)
				for (int j=1;j<24;j++)
						map[i][j]=0;
		}
		else
		{
			
			robot=new Robot();
			robot.setmap(map);
			robot.way(1,1);
			robot.start();
		}
	}

	public void mouseClicked(MouseEvent e) {
		// TODO: Add your code here
	}

	public void mousePressed(MouseEvent e) {
		
	//	m1=e.getX()/20;
	//	n1=e.getY()/20;
		i1=e.getX();
		j1=e.getY();
	}

	public void mouseReleased(MouseEvent e) {
		//m2=e.getX()/20;
		//n2=e.getY()/20;
		i2=e.getX();
		j2=e.getY();
		if(i1<0)
		i1=0;
		if(j1<0)
		j1=0;
		if(i2<0)
		i2=0;
		if(j2<0)
		j2=0;
		if(i1>499)
		i1=499;
		if(j1>499)
		j1=499;
		if(i2>499)
		i2=499;
		if(j2>499)
		j2=499;
		m1=i1/20;
		n1=j1/20;
		m2=i2/20;
		n2=j2/20;
			
		if (m2<m1)
		{
			int temp;
			temp=m1;
			m1=m2;
			m2=temp;
		}
		if (n2<n1)
		{
			int temp;
			temp=n1;
			n1=n2;
			n2=temp;
		}
		
		
		for (int i=m1;i<=m2;i++)
			for(int j=n1;j<=n2;j++)
			{
				if(map[i][j]==1)
					map[i][j]=0;
				else
					map[i][j]=1;
			
			}
		
	}

	public void mouseEntered(MouseEvent e) {
		// TODO: Add your code here
	}

	public void mouseExited(MouseEvent e) {
		// TODO: Add your code here
	}
}
class myFrame2 extends JFrame 
{
	JButton b1= new JButton("清");
	JButton b2= new JButton("走");
	
	public myFrame2()
	{
		mypanel p= new mypanel();
		JPanel panel= new JPanel();
		panel.setLayout(new GridLayout(2,1));
		panel.add(b1);
		panel.add(b2);
		Container con= this.getContentPane();
		con.setLayout( new BorderLayout());
		con.add(p,BorderLayout.CENTER);
		con.add(panel,BorderLayout.WEST);
		b1.addActionListener(p);
		b1.setActionCommand("qing");
		b2.addActionListener(p);
		b2.setActionCommand("zou");
		Thread t=new Thread(p);
		t.start();
		
	}
	public static void main (String []args)
	{	
		myFrame2 f= new myFrame2();
		f.setSize(560,530);
		f.show();
		
	/*	test my1=new test();
		my1.print(4);*/
	}
	
}
