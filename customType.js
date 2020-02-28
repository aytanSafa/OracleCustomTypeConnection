/*


PACKAGE  PKG_DB2

  procedure hisse_listesi  (p_ARRAYOUT  in OUT t_hisse_a,p_TLINES IN OUT NUMBER );
//

  TYPE t_hisse_a is table of INTERNET.t_hisse_r
//

TYPE          t_hisse_r is object
    (
        hisse_kodu      varchar2(32),
        borsa_kodu      varchar2(32),
        alt_kod         varchar2(5),
        fiyat           number,
        likidite        number,
        kredi_grubu     varchar2(5),
        yasak     number,
        nakti_kadar     number,
        aciga_satis     varchar2(1)
    );




*/









const oracledb = require('oracledb');
const dbConfig = require ('./dbconfig.js');

 async function run(){

    let connection;
    try{
        connection = await oracledb.getConnection(dbConfig);
        console.log("Connection Success");

       t_hisse_a = await connection.getDbObjectClass("INTERNET.T_HISSE_A")

        binds ={
              p_ARRAYOUT:
              { type: t_hisse_a,
                dir: oracledb.BIND_INOUT,
             },
            
             p_TLINES:
            { type: oracledb.NUMBER,
              dir: oracledb.BIND_INOUT,
           },
            };

           var array=[];
         result = await connection.execute(`BEGIN PKG_DB2.hisse_listesi(:p_ARRAYOUT,:p_TLINES);END;`,binds);
          //console.log(result.outBinds.p_ARRAYOUT)
          let result5 =result.outBinds.p_ARRAYOUT;
                
           for (let i =0;i<result5.length;i++){
             array.push(result5[i].FIYAT) 
           }
           console.log(array)
           
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
      
      run();
