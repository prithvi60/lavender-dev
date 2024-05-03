import React from 'react';


function GetIcon(props) {
  const { iconName, text, isActive, ...rest } = props

  const fillColor = isActive ? "#FFF" : "#FF83B0"
  let IconElement = <></>

  switch (iconName) {
    case 'AccessTimeFilledIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12.75 8.65116C12.75 8.23695 12.4142 7.90116 12 7.90116C11.5858 7.90116 11.25 8.23695 11.25 8.65116V11.7324C11.25 12.1503 11.4589 12.5406 11.8066 12.7725L14.0956 14.2985C14.4402 14.5282 14.9059 14.4351 15.1357 14.0904C15.3654 13.7458 15.2723 13.2801 14.9277 13.0504L12.75 11.5986V8.65116Z" fill="#FF83B0" />
      </svg>

      break;
    case 'MoreTimeIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.6156 9.5586C15.8019 9.74491 16.0697 9.83807 16.419 9.83807C16.78 9.83807 17.0478 9.74491 17.2225 9.5586C17.4088 9.36065 17.502 9.08701 17.502 8.73768V6.39716H19.0434C20.2681 7.93461 21 9.88207 21 12.0005C21 16.9711 16.9706 21.0005 12 21.0005C7.02944 21.0005 3 16.9711 3 12.0005C3 7.02993 7.02944 3.00049 12 3.00049C13.1787 3.00049 14.3044 3.22707 15.3361 3.63906V4.33611H13.048C12.7103 4.33611 12.4483 4.42344 12.262 4.59811C12.0873 4.77277 12 5.02895 12 5.36663C12 5.70432 12.0873 5.9605 12.262 6.13516C12.4483 6.30983 12.7103 6.39716 13.048 6.39716H15.3361V8.73768C15.3361 9.08701 15.4293 9.36065 15.6156 9.5586ZM12 7.90165C12.4142 7.90165 12.75 8.23744 12.75 8.65165V11.5991L14.9277 13.0509C15.2723 13.2806 15.3654 13.7463 15.1357 14.0909C14.9059 14.4356 14.4402 14.5287 14.0956 14.2989L11.8066 12.773C11.4589 12.5411 11.25 12.1508 11.25 11.7329V8.65165C11.25 8.23744 11.5858 7.90165 12 7.90165Z" fill="#FF83B0" />
        <path d="M16.4338 9.43141C16.2524 9.43141 16.1138 9.38341 16.0178 9.28741C15.9218 9.18075 15.8738 9.03675 15.8738 8.85541V5.91141H12.9778C12.7964 5.91141 12.6578 5.86341 12.5618 5.76741C12.4658 5.67141 12.4178 5.53808 12.4178 5.36741C12.4178 5.19675 12.4658 5.06341 12.5618 4.96741C12.6578 4.87141 12.7964 4.82341 12.9778 4.82341H15.8738V1.97541C15.8738 1.78341 15.9218 1.63941 16.0178 1.54341C16.1138 1.44741 16.2578 1.39941 16.4498 1.39941C16.6311 1.39941 16.7644 1.44741 16.8498 1.54341C16.9458 1.63941 16.9938 1.78341 16.9938 1.97541V4.82341H19.8898C20.0711 4.82341 20.2098 4.87141 20.3058 4.96741C20.4018 5.06341 20.4498 5.19675 20.4498 5.36741C20.4498 5.53808 20.4018 5.67141 20.3058 5.76741C20.2098 5.86341 20.0711 5.91141 19.8898 5.91141H16.9938V8.85541C16.9938 9.03675 16.9458 9.18075 16.8498 9.28741C16.7644 9.38341 16.6258 9.43141 16.4338 9.43141Z" fill="#FF83B0" />
      </svg>

      break;
    case 'LightModeIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.8V3M12 19.2V21M6.9726 6.9726L5.7 5.7M17.1552 17.1552L18.4278 18.4278M4.8 12H3M19.2 12H21M17.1561 6.9726L18.4287 5.7M6.9735 17.1552L5.7 18.4278" stroke="#FF83B0" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
        <circle cx="12" cy="12" r="4.5" fill="#FF83B0" />
      </svg>

      break;
    case 'MorningIcon':
      IconElement = <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 6L21 6" stroke="#FF83B0" strokeLinecap="round" />
        <path d="M6 8H16" stroke="#FF83B0" strokeLinecap="round" />
        <path d="M7 10H15" stroke="#FF83B0" strokeLinecap="round" />
        <path d="M8 12H14" stroke="#FF83B0" strokeLinecap="round" />
        <path d="M9 14H13" stroke="#FF83B0" strokeLinecap="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M11 0C8.23858 0 6 2.23858 6 5C6 5.34247 6.03443 5.67689 6.10002 6H15.9C15.9656 5.67689 16 5.34247 16 5C16 2.23858 13.7614 0 11 0Z" fill="#FF83B0" />
      </svg>

      break;
    case 'NightIcon':
      IconElement = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.353 0C2.849 1.408 0 4.463 0 8.47C0 10.9975 1.00405 13.4215 2.79127 15.2087C4.57849 16.9959 7.00249 18 9.53 18C13.537 18 16.592 15.151 18 11.647C5.17 14.065 5.14 5.14 6.353 0Z" fill="#FF83B0" />
      </svg>

      break;
    case 'LocationIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13556 2 5 4.87991 5 8.42857C5 14.1429 12 22 12 22C12 22 19 14.1429 19 8.42857C19 4.87991 15.8644 2 12 2ZM12 12C11.4462 12 10.9049 11.8324 10.4444 11.5185C9.98395 11.2045 9.62506 10.7583 9.41314 10.2362C9.20121 9.71416 9.14576 9.13969 9.2538 8.58546C9.36184 8.03123 9.62851 7.52213 10.0201 7.12255C10.4117 6.72297 10.9106 6.45086 11.4537 6.34061C11.9969 6.23037 12.5599 6.28695 13.0715 6.5032C13.5831 6.71945 14.0204 7.08566 14.3281 7.55551C14.6358 8.02537 14.8 8.57777 14.8 9.14286C14.7992 9.90036 14.5039 10.6266 13.979 11.1622C13.4541 11.6979 12.7424 11.9992 12 12Z" fill="#FF83B0" />
      </svg>
      break;

    case 'CalendarIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.08975 8.06653C2.57729 5.54969 4.99284 3.63759 7.89932 3.63759H16.1071C19.0135 3.63759 21.4291 5.54969 21.9166 8.06653H2.08975ZM2 9.94153V16.4709C2 19.4348 4.64121 21.8375 7.89932 21.8375H16.1071C19.3652 21.8375 22.0064 19.4348 22.0064 16.4709V9.94153H2ZM6.36033 13.6746C5.84256 13.6746 5.42283 13.2549 5.42283 12.7371C5.42283 12.2194 5.84256 11.7996 6.36033 11.7996H7.38597C7.90374 11.7996 8.32347 12.2194 8.32347 12.7371C8.32347 13.2549 7.90374 13.6746 7.38597 13.6746H6.36033ZM10.5527 12.7373C10.5527 13.2551 10.9724 13.6748 11.4902 13.6748H12.5159C13.0336 13.6748 13.4534 13.2551 13.4534 12.7373C13.4534 12.2196 13.0336 11.7998 12.5159 11.7998H11.4902C10.9724 11.7998 10.5527 12.2196 10.5527 12.7373ZM16.6201 13.6748C16.1023 13.6748 15.6826 13.2551 15.6826 12.7373C15.6826 12.2196 16.1023 11.7998 16.6201 11.7998H17.6457C18.1635 11.7998 18.5832 12.2196 18.5832 12.7373C18.5832 13.2551 18.1635 13.6748 17.6457 13.6748H16.6201ZM5.42285 16.4706C5.42285 16.9884 5.84258 17.4081 6.36035 17.4081H7.38599C7.90376 17.4081 8.32349 16.9884 8.32349 16.4706C8.32349 15.9529 7.90376 15.5331 7.38599 15.5331H6.36035C5.84258 15.5331 5.42285 15.9529 5.42285 16.4706ZM11.4902 17.4083C10.9724 17.4083 10.5527 16.9885 10.5527 16.4708C10.5527 15.953 10.9724 15.5333 11.4902 15.5333H12.5159C13.0336 15.5333 13.4534 15.953 13.4534 16.4708C13.4534 16.9885 13.0336 17.4083 12.5159 17.4083H11.4902ZM15.6826 16.4708C15.6826 16.9885 16.1023 17.4083 16.6201 17.4083H17.6457C18.1635 17.4083 18.5832 16.9885 18.5832 16.4708C18.5832 15.953 18.1635 15.5333 17.6457 15.5333H16.6201C16.1023 15.5333 15.6826 15.953 15.6826 16.4708ZM16.6199 2C16.1021 2 15.6824 2.41973 15.6824 2.9375V5.7366C15.6824 6.25437 16.1021 6.6741 16.6199 6.6741C17.1376 6.6741 17.5574 6.25437 17.5574 5.7366V2.9375C17.5574 2.41973 17.1376 2 16.6199 2ZM7.38617 2C6.8684 2 6.44867 2.41973 6.44867 2.9375L6.44867 5.7366C6.44867 6.25437 6.8684 6.6741 7.38617 6.6741C7.90393 6.6741 8.32367 6.25437 8.32367 5.7366L8.32367 2.9375C8.32367 2.41973 7.90393 2 7.38617 2Z" fill="#FF83B0" />
      </svg>


      break; case 'TreatmentHeartIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.9855 14.6706C20.6842 11.8059 18.2107 9.66465 15.3311 9.7826L14.2018 9.80094L14.2175 8.67134C14.3354 5.7936 12.1973 3.31686 9.33341 3.01546C6.17342 2.78482 3.42481 5.16197 3.19423 8.32276C3.18637 8.41711 3.18375 8.51408 3.18113 8.60844L3.00033 19.721C2.98461 20.4103 3.52962 20.9843 4.21874 21C4.2397 21 4.25804 21 4.279 21L15.3887 20.8244C18.554 20.7563 21.0668 18.138 20.9986 14.972C20.9986 14.8724 20.9908 14.7728 20.9855 14.6732V14.6706Z" fill="#FF83B0" />
      </svg>


      break; case 'StarIcon':
      IconElement = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.956 6.07695C15.2846 5.08535 16.7154 5.08535 17.044 6.07696L18.8095 11.4048C18.9565 11.8482 19.3779 12.1485 19.8535 12.1485H25.5669C26.6302 12.1485 27.0724 13.4827 26.2121 14.0955L21.5899 17.3883C21.2051 17.6624 21.0441 18.1482 21.1911 18.5916L22.9566 23.9195C23.2852 24.9111 22.1277 25.7357 21.2675 25.1228L16.6452 21.83C16.2605 21.556 15.7395 21.556 15.3548 21.83L10.7326 25.1228C9.87229 25.7357 8.71479 24.9111 9.04339 23.9195L10.8089 18.5916C10.9559 18.1482 10.7949 17.6624 10.4102 17.3883L5.78793 14.0955C4.92765 13.4827 5.36978 12.1485 6.43314 12.1485H12.1465C12.6221 12.1485 13.0436 11.8482 13.1905 11.4048L14.956 6.07695Z" fill="#FF83B0" />
      </svg>


      break;

    case 'LavenderLogo':
      IconElement = <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.8368 3.06836H3.00394C1.34491 3.06836 0 4.40461 0 6.05295V26.5149C0 28.1632 1.34491 29.4994 3.00394 29.4994H25.8368C27.4959 29.4994 28.8408 28.1632 28.8408 26.5149V6.05295C28.8408 4.40461 27.4959 3.06836 25.8368 3.06836Z" fill="#825FFF" />
        <path d="M7.98639 0.5H5.51378C4.82984 0.5 4.27539 1.05088 4.27539 1.73042V3.77765C4.27539 4.45719 4.82984 5.00806 5.51378 5.00806H7.98639C8.67033 5.00806 9.22478 4.45719 9.22478 3.77765V1.73042C9.22478 1.05088 8.67033 0.5 7.98639 0.5Z" fill="#1B1464" />
        <path d="M23.7071 0.5H21.2345C20.5505 0.5 19.9961 1.05088 19.9961 1.73042V3.77765C19.9961 4.45719 20.5505 5.00806 21.2345 5.00806H23.7071C24.391 5.00806 24.9455 4.45719 24.9455 3.77765V1.73042C24.9455 1.05088 24.391 0.5 23.7071 0.5Z" fill="#1B1464" />
        <path d="M22.4919 18.1045C22.2513 15.8328 20.2766 14.1348 17.9776 14.2283L17.076 14.2429L17.0886 13.3471C17.1827 11.0629 15.4757 9.10089 13.1872 8.86187C10.6644 8.67897 8.47001 10.5641 8.28592 13.0706C8.27965 13.1455 8.27756 13.2224 8.27546 13.2972L8.13112 22.1075C8.11857 22.6542 8.55368 23.1093 9.10385 23.1218C9.12058 23.1218 9.13523 23.1218 9.15196 23.1218L18.0215 22.9826C20.5485 22.9285 22.5546 20.8522 22.5003 18.3415C22.5003 18.2625 22.494 18.1835 22.4898 18.1045H22.4919Z" fill="white" />
      </svg>

      break;

    case 'RightArrowIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.73966 14.7004L12.4505 12.1832C12.557 12.0843 12.557 11.9157 12.4505 11.8168L9.73966 9.29959C9.43613 9.01774 9.41855 8.54319 9.70041 8.23966C9.98226 7.93613 10.4568 7.91855 10.7603 8.2004L13.4712 10.7176C14.2168 11.41 14.2168 12.59 13.4712 13.2824L10.7603 15.7996C10.4568 16.0814 9.98226 16.0639 9.70041 15.7603C9.41855 15.4568 9.43613 14.9823 9.73966 14.7004Z" fill="#1B1464" />
      </svg>

      break;

    case 'PaymentCardIcon':
      IconElement = <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.71997 9.49879C4.36671 9.49879 4.08033 9.78516 4.08033 10.1384C4.08033 10.4917 4.36671 10.7781 4.71997 10.7781V9.49879ZM8.38318 10.7781C8.73644 10.7781 9.02282 10.4917 9.02282 10.1384C9.02282 9.78516 8.73644 9.49879 8.38318 9.49879V10.7781ZM3.67334 1.35839H18.3262V0.0791072H3.67334V1.35839ZM19.7798 2.81201V11.1851H21.0591V2.81201H19.7798ZM18.3262 12.6387H3.67334V13.918H18.3262V12.6387ZM2.21972 11.1851V2.81201H0.940435V11.1851H2.21972ZM3.67334 12.6387C2.87053 12.6387 2.21972 11.9879 2.21972 11.1851H0.940435C0.940435 12.6944 2.164 13.918 3.67334 13.918V12.6387ZM19.7798 11.1851C19.7798 11.9879 19.129 12.6387 18.3262 12.6387V13.918C19.8355 13.918 21.0591 12.6944 21.0591 11.1851H19.7798ZM18.3262 1.35839C19.129 1.35839 19.7798 2.0092 19.7798 2.81201H21.0591C21.0591 1.30267 19.8355 0.0791072 18.3262 0.0791072V1.35839ZM3.67334 0.0791072C2.164 0.0791072 0.940435 1.30267 0.940435 2.81201H2.21972C2.21972 2.0092 2.87053 1.35839 3.67334 1.35839V0.0791072ZM1.58008 5.54492H20.4194V4.26563H1.58008V5.54492ZM4.71997 10.7781H8.38318V9.49879H4.71997V10.7781Z" fill="#FF83B0" />
      </svg>


      break;

    case 'LanguageIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4406 20.0004C12.2806 20.0004 12.1517 19.9642 12.054 19.8916C11.9651 19.8191 11.9118 19.7194 11.894 19.5925C11.8762 19.4655 11.9029 19.325 11.974 19.1709L15.6133 10.7666C15.6932 10.5762 15.7954 10.4402 15.9199 10.3586C16.0443 10.268 16.182 10.2227 16.3331 10.2227C16.4842 10.2227 16.6175 10.268 16.733 10.3586C16.8575 10.4402 16.9641 10.5762 17.053 10.7666L20.6922 19.1709C20.7633 19.325 20.79 19.4701 20.7722 19.6061C20.7633 19.733 20.7145 19.8327 20.6256 19.9052C20.5367 19.9687 20.4123 20.0004 20.2523 20.0004C20.0746 20.0004 19.9324 19.9551 19.8258 19.8644C19.7191 19.7647 19.6258 19.6242 19.5458 19.4429L18.5993 17.1854L19.1725 17.5118H13.467L14.0402 17.1854L13.0938 19.4429C13.0138 19.6423 12.9249 19.7874 12.8272 19.878C12.7294 19.9596 12.6005 20.0004 12.4406 20.0004ZM16.3065 11.7458L14.2269 16.7638L13.9069 16.4783H18.7326L18.426 16.7638L16.3331 11.7458H16.3065Z" fill="#FF83B0" />
        <path d="M3 6.66797H16.3333" stroke="#FF83B0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9.22266 6.66667V4" stroke="#FF83B0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.7773 6.66797C12.7773 8.0013 10.1107 12.4457 4.77734 16.8902" stroke="#FF83B0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 8.89062C7.2963 9.77951 8.77778 12.2684 12.3333 15.1128" stroke="#FF83B0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      break;

    case 'ContactIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.7071 13.7071L20.3552 16.3552C20.7113 16.7113 20.7113 17.2887 20.3552 17.6448C18.43 19.57 15.3821 19.7866 13.204 18.153L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L5.84701 10.796C4.21341 8.61788 4.43001 5.56999 6.35523 3.64477C6.71133 3.28867 7.28867 3.28867 7.64477 3.64477L10.2929 6.29289C10.6834 6.68342 10.6834 7.31658 10.2929 7.70711L9.27175 8.72825C9.10946 8.89054 9.06923 9.13846 9.17187 9.34373C10.3585 11.7171 12.2829 13.6415 14.6563 14.8281C14.8615 14.9308 15.1095 14.8905 15.2717 14.7283L16.2929 13.7071C16.6834 13.3166 17.3166 13.3166 17.7071 13.7071Z" stroke="#FF83B0" strokeWidth="1.5" />
      </svg>

      break;

    case 'ManIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0002 21.2622C17.1155 21.2622 21.2622 17.1155 21.2622 12.0002C21.2622 6.885 17.1155 2.73828 12.0002 2.73828C6.885 2.73828 2.73828 6.885 2.73828 12.0002C2.73828 17.1155 6.885 21.2622 12.0002 21.2622Z" stroke="#FF83B0" strokeWidth="1.5"/>
      <path d="M17.5577 10.1484C17.5577 10.1484 14.2818 11.5377 12.0005 11.5377C9.71932 11.5377 6.44336 10.1484 6.44336 10.1484M12.0005 12.0008V13.3457M12.0005 13.3457C12.0003 13.8787 12.1533 14.4005 12.4414 14.8489L14.7791 18.4842M12.0005 13.3457C12.0008 13.8787 11.8478 14.4005 11.5597 14.8489L9.22195 18.4842" stroke="#FF83B0" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12.0002" cy="8.00513" r="2.14185" fill="#FF83B0"/>
      </svg>
      

      break;

    case 'PlusIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6 22V13.4H2V10.6H10.6V2H13.4V10.6H22V13.4H13.4V22H10.6Z" fill="#825FFF"/>
      </svg>
      break;

    case 'SelectedIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#825FFF"/>
      <path d="M7.5 13L10.6723 14.9796L16.8444 8.73657" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      
      break;

    case 'StoreIcon':
      IconElement = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.62127 4.51493C4.80316 3.78737 4.8941 3.42359 5.16536 3.21179C5.43663 3 5.8116 3 6.56155 3H17.4384C18.1884 3 18.5634 3 18.8346 3.21179C19.1059 3.42359 19.1968 3.78737 19.3787 4.51493L20.5823 9.32938C20.6792 9.71675 20.7276 9.91044 20.7169 10.0678C20.6892 10.4757 20.416 10.8257 20.0269 10.9515C19.8769 11 19.6726 11 19.2641 11C18.7309 11 18.4644 11 18.2405 10.9478C17.6133 10.8017 17.0948 10.3625 16.8475 9.76782C16.7593 9.55555 16.7164 9.29856 16.6308 8.78457C16.6068 8.64076 16.5948 8.56886 16.5812 8.54994C16.5413 8.49439 16.4587 8.49439 16.4188 8.54994C16.4052 8.56886 16.3932 8.64076 16.3692 8.78457L16.2877 9.27381C16.2791 9.32568 16.2747 9.35161 16.2704 9.37433C16.0939 10.3005 15.2946 10.9777 14.352 10.9995C14.3289 11 14.3026 11 14.25 11C14.1974 11 14.1711 11 14.148 10.9995C13.2054 10.9777 12.4061 10.3005 12.2296 9.37433C12.2253 9.35161 12.2209 9.32568 12.2123 9.27381L12.1308 8.78457C12.1068 8.64076 12.0948 8.56886 12.0812 8.54994C12.0413 8.49439 11.9587 8.49439 11.9188 8.54994C11.9052 8.56886 11.8932 8.64076 11.8692 8.78457L11.7877 9.27381C11.7791 9.32568 11.7747 9.35161 11.7704 9.37433C11.5939 10.3005 10.7946 10.9777 9.85199 10.9995C9.82887 11 9.80258 11 9.75 11C9.69742 11 9.67113 11 9.64801 10.9995C8.70541 10.9777 7.90606 10.3005 7.7296 9.37433C7.72527 9.35161 7.72095 9.32568 7.7123 9.27381L7.63076 8.78457C7.60679 8.64076 7.59481 8.56886 7.58122 8.54994C7.54132 8.49439 7.45868 8.49439 7.41878 8.54994C7.40519 8.56886 7.39321 8.64076 7.36924 8.78457C7.28357 9.29856 7.24074 9.55555 7.15249 9.76782C6.90524 10.3625 6.38675 10.8017 5.75951 10.9478C5.53563 11 5.26905 11 4.73591 11C4.32737 11 4.12309 11 3.97306 10.9515C3.58403 10.8257 3.31078 10.4757 3.28307 10.0678C3.27239 9.91044 3.32081 9.71675 3.41765 9.32938L4.62127 4.51493Z" fill="#FF83B0"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.01747 12.5C5 12.9209 5 13.415 5 13.9998V19.9998C5 20.9426 5 21.414 5.29289 21.7069C5.58579 21.9998 6.05719 21.9998 7 21.9998H10V17.9998C10 17.4475 10.4477 16.9998 11 16.9998H13C13.5523 16.9998 14 17.4475 14 17.9998V21.9998H17C17.9428 21.9998 18.4142 21.9998 18.7071 21.7069C19 21.414 19 20.9426 19 19.9998V13.9998C19 13.415 19 12.9209 18.9825 12.5C18.6177 12.4991 18.2446 12.4888 17.9002 12.4085C17.3808 12.2875 16.904 12.0517 16.5 11.7266C15.9159 12.1967 15.1803 12.4805 14.3867 12.4989C14.3456 12.4998 14.3022 12.4998 14.2609 12.4998H14.2608L14.25 12.4998L14.2392 12.4998H14.2391C14.1978 12.4998 14.1544 12.4998 14.1133 12.4989C13.3197 12.4805 12.5841 12.1967 12 11.7266C11.4159 12.1967 10.6803 12.4805 9.88668 12.4989C9.84555 12.4998 9.80225 12.4998 9.76086 12.4998H9.76077L9.75 12.4998L9.73923 12.4998H9.73914C9.69775 12.4998 9.65445 12.4998 9.61332 12.4989C8.8197 12.4805 8.08409 12.1967 7.5 11.7266C7.09596 12.0517 6.6192 12.2875 6.09984 12.4085C5.75542 12.4888 5.38227 12.4991 5.01747 12.5Z" fill="#FF83B0"/>
      </svg>
      break;

    case 'BackIcon':
      IconElement = <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM9.0993 9.86661C8.99279 9.96551 8.99279 10.1341 9.09931 10.233L11.8101 12.7502C12.1137 13.0321 12.1313 13.5066 11.8494 13.8101C11.5675 14.1137 11.093 14.1313 10.7895 13.8494L8.07863 11.3322C7.33301 10.6398 7.33301 9.45977 8.07863 8.76742L10.7895 6.25021C11.093 5.96836 11.5675 5.98593 11.8494 6.28947C12.1313 6.593 12.1137 7.06755 11.8101 7.3494L9.0993 9.86661Z"
        fill="#000000"
      />
    </svg>
      break;
    case 'NextIcon':
      IconElement = <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.73966 12.7004L10.4505 10.1832C10.557 10.0843 10.557 9.91571 10.4505 9.8168L7.73966 7.29959C7.43613 7.01774 7.41855 6.54319 7.70041 6.23966C7.98226 5.93613 8.45681 5.91855 8.76034 6.2004L11.4712 8.71761C12.2168 9.40997 12.2168 10.59 11.4712 11.2824L8.76034 13.7996C8.45681 14.0814 7.98226 14.0639 7.70041 13.7603C7.41855 13.4568 7.43613 12.9823 7.73966 12.7004Z"
        fill="#000000"
      />
    </svg>
      break;

    case 'SalonHome':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.83846 11.7775C6.31232 12.1529 6 12.7593 6 13.4056V28.8147C6 29.9193 6.89543 30.8147 8 30.8147H14.25V21.3147C14.25 20.7624 14.6977 20.3147 15.25 20.3147H20.75C21.3023 20.3147 21.75 20.7624 21.75 21.3147V30.8147H28C29.1046 30.8147 30 29.9193 30 28.8147V13.4056C30 12.7593 29.6877 12.1529 29.1615 11.7775L19.1615 4.64335C18.4665 4.14753 17.5335 4.14753 16.8385 4.64335L6.83846 11.7775Z" fill={fillColor}/>
      </svg>
      break;
    case 'Schedule':
      IconElement = <svg width="36" height="36" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.49753 36.6292C11.715 25.2021 22.6838 16.5216 35.8813 16.5216H73.1581C86.3556 16.5216 97.3244 25.2021 99.5418 36.6292H9.49753ZM9.08853 45.1448V74.8062C9.08853 88.2673 21.084 99.1797 35.8813 99.1797H73.1581C87.9553 99.1797 99.9508 88.2673 99.9508 74.8062V45.1448H9.08853ZM28.8848 62.1099C26.5332 62.1099 24.6269 60.2036 24.6269 57.8521C24.6269 55.5006 26.5332 53.5943 28.8848 53.5943H33.5429C35.8944 53.5943 37.8007 55.5006 37.8007 57.8521C37.8007 60.2036 35.8944 62.1099 33.5429 62.1099H28.8848ZM47.9207 57.8521C47.9207 60.2036 49.827 62.1099 52.1785 62.1099H56.8367C59.1882 62.1099 61.0945 60.2036 61.0945 57.8521C61.0945 55.5006 59.1882 53.5943 56.8367 53.5943H52.1785C49.827 53.5943 47.9207 55.5006 47.9207 57.8521ZM75.4723 62.1099C73.1208 62.1099 71.2145 60.2036 71.2145 57.8521C71.2145 55.5006 73.1208 53.5943 75.4723 53.5943H80.1304C82.482 53.5943 84.3882 55.5006 84.3882 57.8521C84.3882 60.2036 82.482 62.1099 80.1304 62.1099H75.4723ZM24.6269 74.8117C24.6269 77.1633 26.5332 79.0695 28.8848 79.0695H33.5429C35.8944 79.0695 37.8007 77.1633 37.8007 74.8117C37.8007 72.4602 35.8944 70.5539 33.5429 70.5539H28.8848C26.5332 70.5539 24.6269 72.4602 24.6269 74.8117ZM52.1785 79.0695C49.827 79.0695 47.9207 77.1633 47.9207 74.8117C47.9207 72.4602 49.827 70.5539 52.1785 70.5539H56.8367C59.1882 70.5539 61.0945 72.4602 61.0945 74.8117C61.0945 77.1633 59.1882 79.0695 56.8367 79.0695H52.1785ZM71.2145 74.8117C71.2145 77.1633 73.1208 79.0695 75.4723 79.0695H80.1304C82.482 79.0695 84.3882 77.1633 84.3882 74.8117C84.3882 72.4602 82.482 70.5539 80.1304 70.5539H75.4723C73.1208 70.5539 71.2145 72.4602 71.2145 74.8117ZM75.4773 9.08594C73.1258 9.08594 71.2195 10.9922 71.2195 13.3438V26.0563C71.2195 28.4079 73.1258 30.3141 75.4773 30.3141C77.8288 30.3141 79.7351 28.4079 79.7351 26.0563L79.7351 13.3438C79.7351 10.9922 77.8288 9.08594 75.4773 9.08594ZM33.5556 9.08594C31.2041 9.08594 29.2978 10.9922 29.2978 13.3438V26.0563C29.2978 28.4079 31.2041 30.3141 33.5556 30.3141C35.9071 30.3141 37.8134 28.4079 37.8134 26.0563V13.3438C37.8134 10.9922 35.9071 9.08594 33.5556 9.08594Z" fill={fillColor}/>
      </svg>      
      break;
    case 'Appointments':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.64601 6C5.64601 4.34314 6.98916 3 8.64601 3H27.2512C28.908 3 30.2512 4.34315 30.2512 6V30.0001C30.2512 31.657 28.908 33.0001 27.2512 33.0001H8.64601C6.98916 33.0001 5.64601 31.657 5.64601 30.0001V6ZM7.72166 10.4999C7.72166 9.94764 8.16937 9.49993 8.72166 9.49993H27.1755C27.7278 9.49993 28.1755 9.94764 28.1755 10.4999C28.1755 11.0522 27.7278 11.4999 27.1755 11.4999H8.72166C8.16937 11.4999 7.72166 11.0522 7.72166 10.4999ZM8.72165 14.0001C8.16937 14.0001 7.72165 14.4478 7.72165 15.0001C7.72165 15.5524 8.16937 16.0001 8.72165 16.0001H27.1755C27.7278 16.0001 28.1755 15.5524 28.1755 15.0001C28.1755 14.4478 27.7278 14.0001 27.1755 14.0001H8.72165ZM7.72165 19.5002C7.72165 18.9479 8.16937 18.5002 8.72165 18.5002H17.9486C18.5009 18.5002 18.9486 18.9479 18.9486 19.5002C18.9486 20.0525 18.5009 20.5002 17.9486 20.5002H8.72165C8.16937 20.5002 7.72165 20.0525 7.72165 19.5002ZM26.3009 23.2485C26.7143 22.8822 26.7524 22.2502 26.3862 21.8369C26.0199 21.4235 25.3879 21.3853 24.9745 21.7516L20.4218 25.7855L18.4283 24.6957C17.9436 24.4308 17.336 24.6089 17.0711 25.0935C16.8062 25.5781 16.9843 26.1857 17.4689 26.4506L20.0793 27.8775L20.696 28.2146L21.2221 27.7485L26.3009 23.2485Z" fill={fillColor}/>
      </svg>      
      break;
    case 'Clients':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.1322 31.2417C21.0012 31.2417 21.7942 30.6825 21.9179 29.8224C21.9769 29.4126 22.0074 28.9935 22.0074 28.5673C22.0074 23.7418 18.0956 19.8301 13.2702 19.8301C8.44481 19.8301 4.53304 23.7418 4.53304 28.5673C4.53304 28.9935 4.56356 29.4126 4.62253 29.8224C4.74627 30.6825 5.53927 31.2417 6.40822 31.2417H20.1322Z" fill={fillColor}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M29.8286 20.0539C30.6404 20.0539 31.4234 19.5615 31.4624 18.7506C31.4654 18.6886 31.4669 18.6263 31.4669 18.5638C31.4669 15.875 28.6871 13.6953 25.2581 13.6953C21.829 13.6953 19.0492 15.875 19.0492 18.5638C19.0492 18.6263 19.0507 18.6886 19.0537 18.7506C19.0927 19.5615 19.8757 20.0539 20.6875 20.0539H29.8286Z" fill={fillColor}/>
      <circle cx="13.5295" cy="13.5229" r="5.41352" fill={fillColor}/>
      <circle cx="25.2597" cy="9.21526" r="3.73796" fill={fillColor}/>
      </svg>
    break;
    case 'Team':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18.1615" cy="9.43628" r="5.43628" fill={fillColor}/>
      <circle cx="9.43629" cy="25.5645" r="5.43628" fill={fillColor}/>
      <circle cx="26.953" cy="25.5645" r="5.43628" fill={fillColor}/>
      <path d="M7.23889 18.6771C7.18061 17.1323 7.87718 13.3345 11.1297 10.5017" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
      <path d="M29.0835 18.6771C29.1418 17.1323 28.4452 13.3345 25.1926 10.5017" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
      <path d="M15.3707 29.0332C16.9487 29.7191 18.8975 29.8893 20.9209 29.0334" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
      </svg>      
    break;
    case 'Analytics':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14.75" width="6.25" height="13.75" rx="1" fill={fillColor}/>
      <rect x="14.75" y="9.75" width="6.25" height="18.75" rx="1" fill={fillColor}/>
      <rect x="23.5" y="6" width="6.25" height="22.5" rx="1" fill={fillColor}/>
      <path d="M6 31H31" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
      </svg>      
    break;
    case 'Services':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.7882 0.865571C27.9742 0.503576 28.4917 0.503576 28.6777 0.865571L30.2751 3.9746C30.3229 4.06749 30.3985 4.1431 30.4914 4.19082L33.6004 5.78825C33.9624 5.97424 33.9624 6.49172 33.6004 6.67771L30.4914 8.27513C30.3985 8.32286 30.3229 8.39847 30.2751 8.49136L28.6777 11.6004C28.4917 11.9624 27.9742 11.9624 27.7882 11.6004L26.1908 8.49136C26.1431 8.39847 26.0675 8.32286 25.9746 8.27513L22.8656 6.67771C22.5036 6.49172 22.5036 5.97424 22.8656 5.78825L25.9746 4.19082C26.0675 4.1431 26.1431 4.06749 26.1908 3.9746L27.7882 0.865571Z" fill={fillColor}/>
      <path d="M27.7882 14.2706C27.9742 13.9086 28.4917 13.9086 28.6777 14.2706L29.3834 15.6441C29.4312 15.737 29.5068 15.8126 29.5997 15.8604L30.9732 16.5661C31.3352 16.7521 31.3352 17.2695 30.9732 17.4555L29.5997 18.1613C29.5068 18.209 29.4312 18.2846 29.3834 18.3775L28.6777 19.751C28.4917 20.113 27.9742 20.113 27.7882 19.751L27.0825 18.3775C27.0348 18.2846 26.9592 18.209 26.8663 18.1613L25.4928 17.4555C25.1308 17.2695 25.1308 16.7521 25.4928 16.5661L26.8663 15.8604C26.9592 15.8126 27.0348 15.737 27.0825 15.6441L27.7882 14.2706Z" fill={fillColor}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.581 17.4249L6.03389 7L4.71038 9.8745C4.44575 10.4493 4.5115 11.1161 4.88369 11.6321L11.2769 20.4951L8.98639 23.659C8.2964 23.2641 7.49133 23.0374 6.63155 23.0374C4.07362 23.0374 2 25.0438 2 27.5187C2 29.9937 4.07362 32 6.63155 32C9.18949 32 11.2631 29.9937 11.2631 27.5187C11.2631 26.8051 11.0907 26.1304 10.784 25.5316L13.5442 21.7189L16.2531 25.4608C15.9232 26.077 15.7369 26.7768 15.7369 27.5187C15.7369 29.9937 17.8105 32 20.3684 32C22.9264 32 25 29.9937 25 27.5187C25 25.0438 22.9264 23.0374 20.3684 23.0374C19.5346 23.0374 18.7522 23.2506 18.0764 23.6238L15.8483 20.5461L22.2783 11.6321C22.6505 11.1161 22.7162 10.4493 22.4516 9.8745L21.1281 7L13.581 17.4249ZM8.68448 27.5187C8.68448 28.6157 7.76535 29.505 6.63155 29.505C5.49775 29.505 4.57863 28.6157 4.57863 27.5187C4.57863 26.4217 5.49775 25.5324 6.63155 25.5324C7.76535 25.5324 8.68448 26.4217 8.68448 27.5187ZM22.4214 27.5187C22.4214 28.6157 21.5022 29.505 20.3684 29.505C19.2346 29.505 18.3155 28.6157 18.3155 27.5187C18.3155 26.4217 19.2346 25.5324 20.3684 25.5324C21.5022 25.5324 22.4214 26.4217 22.4214 27.5187Z" fill={fillColor}/>
      </svg>      
    break;
    case 'Account':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.5992 29.1323C21.4681 29.1323 22.2611 28.5732 22.3849 27.7131C22.4438 27.3032 22.4744 26.8841 22.4744 26.4579C22.4744 21.6325 18.5626 17.7207 13.7372 17.7207C8.91177 17.7207 5 21.6325 5 26.4579C5 26.8841 5.03052 27.3032 5.08949 27.7131C5.21323 28.5732 6.00623 29.1323 6.87518 29.1323H20.5992Z" fill={fillColor}/>
      <circle cx="13.9964" cy="11.4135" r="5.41352" fill={fillColor}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M27.53 7.45912C27.3157 7.36792 27.0436 7.36792 26.5 7.36792C25.9564 7.36792 25.6849 7.36792 25.4701 7.45912C25.185 7.58045 24.958 7.81418 24.8391 8.10892C24.7847 8.24272 24.7638 8.39932 24.7551 8.62672C24.7513 8.79148 24.7069 8.9525 24.6263 9.09455C24.5457 9.2366 24.4314 9.35499 24.2943 9.43852C24.1546 9.51898 23.9976 9.56161 23.8378 9.56245C23.678 9.56329 23.5206 9.52231 23.3802 9.44332C23.1845 9.33652 23.0427 9.27772 22.9026 9.25852C22.596 9.21681 22.286 9.3022 22.0399 9.49612C21.8558 9.64132 21.7198 9.88372 21.4483 10.3679C21.1762 10.8521 21.0407 11.0939 21.01 11.3309C20.9695 11.6465 21.0529 11.9657 21.2416 12.2183C21.3273 12.3335 21.4483 12.4301 21.6353 12.5513C21.9114 12.7295 22.0886 13.0331 22.0886 13.3679C22.0886 13.7027 21.9114 14.0063 21.6358 14.1839C21.4483 14.3057 21.3273 14.4023 21.241 14.5175C21.1479 14.6423 21.0795 14.7849 21.0398 14.9373C21.0002 15.0896 20.9901 15.2485 21.01 15.4049C21.0407 15.6413 21.1762 15.8837 21.4483 16.3679C21.7204 16.8521 21.8558 17.0939 22.0399 17.2397C22.2854 17.4335 22.5957 17.5187 22.9026 17.4773C23.0427 17.4581 23.1845 17.3993 23.3802 17.2925C23.5207 17.2134 23.6782 17.1724 23.8381 17.1732C23.998 17.1741 24.1551 17.2168 24.2949 17.2973C24.5762 17.4653 24.743 17.7743 24.7551 18.1091C24.7638 18.3371 24.7847 18.4931 24.8391 18.6269C24.9572 18.9209 25.1841 19.1549 25.4701 19.2767C25.6843 19.3679 25.9564 19.3679 26.5 19.3679C27.0436 19.3679 27.3157 19.3679 27.53 19.2767C27.8151 19.1554 28.0421 18.9217 28.161 18.6269C28.2154 18.4931 28.2362 18.3371 28.2449 18.1091C28.2565 17.7743 28.4238 17.4647 28.7058 17.2973C28.8454 17.2169 29.0024 17.1742 29.1622 17.1734C29.322 17.1726 29.4794 17.2135 29.6199 17.2925C29.8156 17.3993 29.9574 17.4581 30.0975 17.4773C30.4043 17.5193 30.7147 17.4335 30.9601 17.2397C31.1442 17.0945 31.2803 16.8521 31.5518 16.3679C31.8239 15.8837 31.9594 15.6419 31.99 15.4049C32.0099 15.2485 31.9997 15.0895 31.96 14.9372C31.9202 14.7849 31.8517 14.6422 31.7585 14.5175C31.6728 14.4023 31.5518 14.3057 31.3648 14.1845C31.0886 14.0063 30.9115 13.7027 30.9115 13.3679C30.9115 13.0331 31.0886 12.7295 31.3642 12.5519C31.5518 12.4301 31.6728 12.3335 31.759 12.2183C31.8522 12.0936 31.9206 11.9509 31.9602 11.7986C31.9999 11.6463 32.01 11.4873 31.99 11.3309C31.9594 11.0945 31.8239 10.8521 31.5518 10.3679C31.2797 9.88372 31.1442 9.64192 30.9601 9.49612C30.714 9.3022 30.404 9.21681 30.0975 9.25852C29.9574 9.27772 29.8156 9.33652 29.6199 9.44332C29.4794 9.52242 29.3219 9.56345 29.1619 9.56261C29.002 9.56177 28.8449 9.51909 28.7052 9.43852C28.5682 9.35492 28.4541 9.2365 28.3735 9.09445C28.293 8.95241 28.2487 8.79142 28.2449 8.62672C28.2362 8.39872 28.2154 8.24272 28.161 8.10892C28.1021 7.96296 28.0161 7.83045 27.9078 7.71895C27.7996 7.60746 27.6712 7.51917 27.53 7.45912ZM26.5 15.1679C27.4668 15.1679 28.2501 14.3621 28.2501 13.3679C28.2501 12.3737 27.4663 11.5679 26.5 11.5679C25.5332 11.5679 24.7499 12.3737 24.7499 13.3679C24.7499 14.3621 25.5338 15.1679 26.5 15.1679Z" fill={fillColor}/>
      </svg>      
      break;
    case 'SalonProfile':
      IconElement = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.12127 6.01493C7.30316 5.28737 7.3941 4.92359 7.66536 4.71179C7.93663 4.5 8.3116 4.5 9.06155 4.5H26.9384C27.6884 4.5 28.0634 4.5 28.3346 4.71179C28.6059 4.92359 28.6968 5.28737 28.8787 6.01493L30.8787 14.0149C31.1647 15.1589 31.3077 15.7308 31.0074 16.1154C30.7072 16.5 30.1176 16.5 28.9384 16.5H28.869C27.2698 16.5 26.4702 16.5 25.9139 16.0365C25.9056 16.0295 25.8974 16.0226 25.8892 16.0155C25.3405 15.543 25.2091 14.7543 24.9461 13.1769C24.872 12.732 24.8349 12.5096 24.7516 12.5083C24.7505 12.5083 24.7495 12.5083 24.7484 12.5083C24.6651 12.5096 24.628 12.732 24.5539 13.1769L24.4315 13.9107C24.2867 14.7799 24.2143 15.2144 24.0095 15.5475C23.7864 15.9103 23.4534 16.1924 23.0589 16.3528C22.6967 16.5 22.2561 16.5 21.375 16.5C20.4939 16.5 20.0533 16.5 19.6911 16.3528C19.2966 16.1924 18.9636 15.9103 18.7405 15.5475C18.5357 15.2144 18.4633 14.7799 18.3185 13.9107L18.1961 13.1769C18.122 12.732 18.0849 12.5096 18.0016 12.5083C18.0005 12.5083 17.9995 12.5083 17.9984 12.5083C17.9151 12.5096 17.878 12.732 17.8039 13.1769L17.6815 13.9107C17.5367 14.7799 17.4643 15.2144 17.2595 15.5475C17.0364 15.9103 16.7034 16.1924 16.3089 16.3528C15.9467 16.5 15.5061 16.5 14.625 16.5C13.7439 16.5 13.3033 16.5 12.9411 16.3528C12.5466 16.1924 12.2136 15.9103 11.9905 15.5475C11.7857 15.2144 11.7133 14.7799 11.5685 13.9107L11.4461 13.1769C11.372 12.732 11.3349 12.5096 11.2516 12.5083C11.2505 12.5083 11.2495 12.5083 11.2484 12.5083C11.1651 12.5096 11.128 12.732 11.0539 13.1769C10.7909 14.7543 10.6595 15.543 10.1108 16.0155C10.1026 16.0226 10.0944 16.0295 10.0861 16.0365C9.52983 16.5 8.73023 16.5 7.13101 16.5H7.06155C5.88242 16.5 5.29285 16.5 4.99257 16.1154C4.69229 15.7308 4.83529 15.1589 5.12127 14.0149L7.12127 6.01493Z" fill={fillColor}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.50435 17.9999C7.5 18.3003 7.5 18.6322 7.5 19V31C7.5 31.9428 7.5 32.4142 7.79289 32.7071C8.08579 33 8.55719 33 9.5 33H15V26.5C15 25.9477 15.4477 25.5 16 25.5H20C20.5523 25.5 21 25.9477 21 26.5V33H26.5C27.4428 33 27.9142 33 28.2071 32.7071C28.5 32.4142 28.5 31.9428 28.5 31V19C28.5 18.6322 28.5 18.3003 28.4957 17.9999C27.8764 17.9988 27.3026 17.9908 26.8166 17.9308C26.1934 17.8538 25.5367 17.6747 24.9536 17.1888C24.9391 17.1767 24.9247 17.1645 24.9104 17.1522C24.8545 17.104 24.8013 17.0547 24.7507 17.0044C24.4283 17.3192 24.0462 17.5706 23.6238 17.7424C23.2375 17.8994 22.8614 17.954 22.5153 17.978C22.1971 18.0001 21.8216 18 21.4179 18L21.375 18L21.3321 18C20.9284 18 20.5529 18.0001 20.2347 17.978C19.8886 17.954 19.5125 17.8994 19.1262 17.7424C18.7041 17.5708 18.3223 17.3196 18 17.0051C17.6777 17.3196 17.2959 17.5708 16.8738 17.7424C16.4875 17.8994 16.1114 17.954 15.7653 17.978C15.4471 18.0001 15.0716 18 14.6679 18L14.625 18L14.5821 18C14.1784 18 13.8029 18.0001 13.4847 17.978C13.1386 17.954 12.7625 17.8994 12.3762 17.7424C11.9538 17.5706 11.5717 17.3192 11.2493 17.0044C11.1987 17.0547 11.1455 17.104 11.0896 17.1522C11.0753 17.1645 11.0609 17.1767 11.0464 17.1888C10.4633 17.6747 9.80662 17.8538 9.18345 17.9308C8.69735 17.9908 8.12356 17.9988 7.50435 17.9999Z" fill={fillColor}/>
      </svg>
      break;
    
    default:
      break;
  }

  return (
    <div {...rest}>
      {IconElement}
      {text}
    </div>
  );
}

export default GetIcon;
