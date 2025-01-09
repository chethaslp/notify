export const template = (title, att, url, name)=> `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Notify - A new update is available.</title>
  <style>
@media only screen and (max-width: 620px) {
  table[class='body'] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class='body'] p,
table[class='body'] ul,
table[class='body'] ol,
table[class='body'] td,
table[class='body'] span,
table[class='body'] a {
    font-size: 16px !important;
  }

  table[class='body'] .wrapper,
table[class='body'] .article {
    padding: 10px !important;
  }

  table[class='body'] .content {
    padding: 0 !important;
  }

  table[class='body'] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class='body'] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class='body'] .btn table {
    width: 100% !important;
  }

  table[class='body'] .btn a {
    width: 100% !important;
  }

  table[class='body'] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  .btn-primary table td:hover {
    background-color: #d5075d !important;
  }

  .btn-primary a:hover {
    background-color: #d5075d !important;
    border-color: #d5075d !important;
  }
}
</style></head>
  <body class style="background-color: #161f33; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #161f33; width: 100%;" width="100%" bgcolor="#161f33">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: center;" valign="center">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: center; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="center">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
              <tr>
                <td class="align-center" style="font-family: sans-serif; font-size: 14px; vertical-align: center; text-align: center;" valign="center" align="center">
                  <a href="https://github.com/chethaslp" style="color: #ec0867; text-decoration: underline;"><img src="https://raw.githubusercontent.com/chethaslp/notify/refs/heads/main/assets/notify.png" height="100" alt="Notify" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">A new update is found.</span>
            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: center; box-sizing: border-box; padding: 20px;" valign="center">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: center;" valign="center">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"><a href="${url}">${name}</a></p>
                        <h3 style="color: #06090f; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px;"><b>${title}</b></h3>
                        ${att && `<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; min-width: 100%; width: 100%;" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: center; padding-bottom: 15px;" valign="center">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;" width="auto">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: center; background-color: #ffffff; border-radius: 5px; text-align: center;" valign="center" bgcolor="#ffffff" align="center"> <a href="${att}" target="_blank" style="background-color: #ffffff; border: solid 1px #ec0867; border-radius: 5px; box-sizing: border-box; color: #ec0867; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize;">Download Attachment</a> </td>
                                    </tr>
                                    <br>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>`}
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Note: This content may irrelevent/inaccurate as this is an automated mail. Please visit <a href="${url}" target="_blank" style="color: #ec0867; text-decoration: underline;">${url}</a> to view more.</p>
                        
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: center; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="center" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">University College of Engineering, Kariavattom</span>
                    <br>
                    Powered by <a href="https://github.com/chethaslp/notify" style="text-decoration: underline; color: #9a9ea6; font-size: 12px; text-align: center;">Notify.</a> 
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: center; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="center" align="center">
                    Built with 💖 by <a href="https://github.com/chethaslp" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">@clp</a>
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: center;" valign="center">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`
