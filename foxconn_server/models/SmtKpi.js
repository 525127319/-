�}�~ I  ��G�O������u
��
�d��I:�8��3�����yԖ�sZhޞS7���?��хG�t#HzT -*�9B3E��3�/��a�i�b���Cf����Ij�]A#�4]]F��d	^�7NU (8�dj�����𻞕^vc���f)k����i[�(c�S@p�e�:��7��z!�N�kKR�uk,n,����>�~�.��B���ۡ>4�s���9������əf��-�?꒚��k@.�$iu����D���r�AMa����Q7�����ED�ꦋP�7��,��W���\@OyA`b��z�Y�؋੕/X�-�K�SnF�0�����q�H��:an��mZt� �[����J��?�T��݆ݗz,�;q���%�U!@�nzi�+bϢ���@�-w+���|�D�ƶ��z,!��P��=Ӳ�
��>���N0e/	���G�q���w�o��8�P4]���+r�y��F�'hlD L���i�<�<����zE���,�z�������M%�T��q��Џ\��-��m��O#	�A����yqT̴�F����%��I=
.RJaXy�B�EB�19�@P�V�H�)L+���"�s�*s�v�&���d���� �j�*�+A�0,�6�dl^���J�T��e�����	p�}�������}���y���}���}Bl�:��:�#����)���%R�S˂���|��x��%�]��H��J�AK�0³����e]/S���^�����	�P�v��c�����n���w,�<pa_xz9"��fEz*@v���'8�P#��F�Ȫ����-���Ύ���y� �/����d�6�h3ґ�YA�9K���68S��)2�?��W�ANAo�[�ŜZ<;�|�>O��Rk�pX��6K�����扆�¶cu���π4,)�c�� 龭ї�r�SGz-��5�t!���������mz,�����pM-"-֊��Yo良品KPI
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      WorkstationInferiorKPI: {//工位次品KPI
        type: DataTypes.INTEGER,
        allowNull: false
      },
      UpdateTime: {//更新时间
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      } 
    }, {
      tableName: 'SmtKpi'
    });
  };
  