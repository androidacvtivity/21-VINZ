SELECT D.cuiio, 
        
        COUNT (D.rind) AS cnt 
            FROM CIS2.VW_data_all D 
            
            where 
            
            D.FORM = 26
            and D.PERIOADA = 1055
            
            
            GROUP by 
            D.CUIIO
            
            ORDER by 
            COUNT (D.rind) desc
        